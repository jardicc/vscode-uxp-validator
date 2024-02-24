/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";

import { TextDocument } from "../../../CssServiceOriginal/cssLanguageTypes";
import { SCSSParser } from "../../../CssServiceOriginal/parser/scssParser";
import { Rule, Rules } from "../../services/lintRules";
import { assertEntries } from "../css/lint.test";

function assertFontFace(input: string, expectedRules: Rule[] | Rule = []): void {
	const p = new SCSSParser();
	const document = TextDocument.create("test://test/test.scss", "scss", 0, input);
	const node = p.internalParse(input, p._parseFontFace)!;

	assertEntries({node, document, expectedRules});
}

function assertRuleSet(input: string, expectedRules: Rule[] | Rule = []): void {
	const p = new SCSSParser();
	const document = TextDocument.create("test://test/test.scss", "scss", 0, input);
	const node = p.internalParse(input, p._parseRuleset)!;
	assertEntries({node, document, expectedRules});
}

suite("SCSS - Lint", () => {

	test("empty ruleset", function () {
		assertRuleSet("selector { color: red; nested {} }");
	});

	test("ID selectors", function () {
		assertRuleSet("#id { color: red; }");
		assertRuleSet("element#id { color: red; }");
		assertRuleSet("#id__#{foo} { color: red; }");
	});

	test("Interpolation selectors", function () {
		assertRuleSet("#{foo} { color: red; }");
		assertRuleSet("#{foo}__cont { color: red; }");
		assertRuleSet("#{foo}.class { color: red; }");
	});

	test("font-face required properties", function () {
		assertFontFace("@font-face {  }", Rules.UnknownAtRules);
		assertFontFace("@font-face { src: url(test.tff) }", Rules.UnknownAtRules);
		assertFontFace("@font-face { font-family: 'name' }", Rules.UnknownAtRules);
		assertFontFace("@font-face { font-#{family}: foo }", Rules.UnknownAtRules);
		assertFontFace("@font-face { font: {family: foo } }", Rules.UnknownAtRules);
		assertFontFace("@font-face { @if true { } }", Rules.UnknownAtRules);
	});

	test("unknown properties", function () {
		assertRuleSet("selector { -ms-property: \"rest is missing\" }", Rules.UnknownProperty);
		assertRuleSet("selector { -moz-box-shadow: \"rest is missing\" }", Rules.UnknownProperty);
		assertRuleSet("selector { color: transparent }"); // no error
		assertRuleSet("selector { -moz-#{box}-shadow: none }"); // no error if theres an interpolation
		assertRuleSet("selector { outer: { nested : blue }"); // no error for nested
	});
});

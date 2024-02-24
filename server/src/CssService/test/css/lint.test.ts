/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as assert from "assert";
import { Node, IRule, Level } from "../../../CssServiceOriginal/parser/cssNodes";
import { Parser } from "../../../CssServiceOriginal/parser/cssParser";
import { LintVisitor } from "../../services/lint";
import { Rule, Rules, LintConfigurationSettings } from "../../services/lintRules";
import { TextDocument } from "../../../CssServiceOriginal/cssLanguageTypes";
import { SCSSParser } from "../../../CssServiceOriginal/parser/scssParser";
import { LESSParser } from "../../../CssServiceOriginal/parser/lessParser";
import { CSSDataManager } from "../../../CssServiceOriginal/languageFacts/dataManager";
import {UXPCustomData} from "../../UXPCustomData";
import {cssData} from "../../data/uxpCustomData";

const cssDataManager = new CSSDataManager({useDefaultDataProvider: true});

interface IAssertArg{
	node: Node
	document: TextDocument
	expectedRules: IRule[] | IRule
	expectedMessages?: string[]
	settings?: LintConfigurationSettings | undefined
	uxpVersion?: string
}

// ! support different UXP versions

export function assertEntries(arg:IAssertArg): void {
	const {node, document, expectedMessages} = arg;
	let expectedRules = arg.expectedRules;

	if (!Array.isArray(expectedRules)) {
		expectedRules = [expectedRules];
	}

	const settings = arg.settings || new LintConfigurationSettings();
	const uxpVersion = arg.uxpVersion || "7.0.0";

	const uxpCustomData = new UXPCustomData(cssData, uxpVersion);
	const entries = LintVisitor.entries(node, document, settings, cssDataManager, Level.Error | Level.Warning | Level.Ignore, uxpCustomData);
	const message = `Did not find all linting error. expected: [${expectedRules.map(e => e.id).join(", ")}], actual: [${entries.map(e => e.getMessage()).join(", ")}]`;

	assert.equal(entries.length, expectedRules.length, message);

	for (const entry of entries) {
		const index = expectedRules.indexOf(entry.getRule());
		assert.ok(index !== -1, `${entry.getRule().id} found but not expected (${expectedRules.map(r => r.id).join(", ")})`);
		if (expectedMessages) {
			assert.equal(entry.getMessage(), expectedMessages[index]);
		}
	}
}
const parsers = [new Parser(), new LESSParser(), new SCSSParser()];

function assertStyleSheet(input: string, expectedRules: Rule[] | Rule = [], uxpVersion?:string): void {
	for (const p of parsers) {
		const document = TextDocument.create("test://test/test.css", "css", 0, input);
		const node = p.parseStylesheet(document);

		assertEntries({node, document, expectedRules, uxpVersion});
	}
}

function assertRuleSet(input: string, expectedRules: Rule[] | Rule = [], uxpVersion?:string): void {
	assertRuleSet2(input, expectedRules, undefined, undefined, uxpVersion);
}

function assertRuleSet2(input: string, expectedRules: Rule[] | Rule = [], expectedMessages?: string[], settings?: LintConfigurationSettings, uxpVersion?:string): void {
	for (const p of parsers) {
		const document = TextDocument.create("test://test/test.css", "css", 0, input);
		const node = p.internalParse(input, p._parseRuleset)!;
		assertEntries({node, document, expectedRules, expectedMessages, settings, uxpVersion});
	}
}

suite("CSS - Lint", () => {

	// PROPERTIES
	test("properties", function () {
		assertRuleSet("selector { color: \"rest is missing\" }");
		assertRuleSet("selector { -moz-transform: none }", Rules.UnknownProperty);
		assertRuleSet("selector { box-property: \"rest is missing\" }", Rules.UnknownProperty);
		assertRuleSet("selector { Box-Property: \"rest is missing\" }", Rules.UnknownProperty);
	});

	test("properties with version switch", function () {
		assertRuleSet("selector { border-collapse: collapse; }");
		assertRuleSet("selector { border-collapse: collapse; }", Rules.UnknownProperty, "5.0.0");
	});

	// ENUM VALUES
	test("enum values", function () {
		assertRuleSet("selector { display: inline }");
		assertRuleSet("selector { display: fakeBlock }", Rules.UnsupportedValue);
		assertRuleSet("selector { border: 1px solid red }");
		assertRuleSet("selector { border: 1px fake red }", Rules.UnsupportedValue);
		assertRuleSet("selector { border: 1px solid fake }", Rules.UnsupportedValue);
	});

	test("enum values with version switch", function () {
		assertRuleSet("selector { display: block; }", undefined, "2.0.0");
		assertRuleSet("selector { display: flex; }", Rules.UnsupportedValue, "2.0.0");
		assertRuleSet("selector { display: flex; }", undefined, "3.0.0");
		assertRuleSet("selector { display: flex; }");
	});

	// test Variable
	test("variable", function () {
		assertRuleSet("selector { --my-var: red; }");
	});

	// DIRECTIVES
	test("directive @media", function(){
		assertStyleSheet("@media screen and (min-width: 900px) { }");
	});
	test("directive @keyframes", function(){
		assertStyleSheet("@keyframes foo { }", Rules.UnknownAtRules);
	});
	test.skip("directive @charset", function(){
		assertStyleSheet(`@charset "utf-8"`, Rules.UnknownAtRules);
	});
	test("directive @color", function(){
		assertStyleSheet("@color-profile --swop5c { }", Rules.UnknownAtRules);
	});
	test("directive @container", function(){
		assertStyleSheet("@container (width > 400px) { }", Rules.UnknownAtRules);
	});
	test("directive @counter", function(){
		assertStyleSheet("@counter-style thumbs { }", Rules.UnknownAtRules);
	});
	test("directive @document", function(){
		assertStyleSheet(`@document url("https://www.example.com/")`, Rules.UnknownAtRules);
	});
	test("directive @font", function(){
		assertStyleSheet("@font-face { }", Rules.UnknownAtRules);
	});
	test("directive @font", function(){
		assertStyleSheet("@font-feature-values Font One { }", Rules.UnknownAtRules);
	});
	test("directive @font", function(){
		assertStyleSheet("@font-palette-values --identifier { }", Rules.UnknownAtRules);
	});
	test("directive @import", function(){
		assertStyleSheet(`@import url("my-imported-styles.css");`, Rules.UnknownAtRules);
	});
	test("directive @keyframes", function(){
		assertStyleSheet("@keyframes slidein { }", Rules.UnknownAtRules);
	});
	test("directive @layer", function(){
		assertStyleSheet("@layer module, state;", Rules.UnknownAtRules);
		assertStyleSheet("@layer module { }", Rules.UnknownAtRules);
	});
	test("directive @namespace", function(){
		assertStyleSheet("@namespace svg url('http://www.w3.org/2000/svg');", Rules.UnknownAtRules);
	});
	test("directive @page", function(){
		assertStyleSheet("@page { }", Rules.UnknownAtRules);
	});
	test("directive @property", function(){
		assertStyleSheet("@property --property-name { }", Rules.UnknownAtRules);
	});
	test("directive @supports", function(){
		assertStyleSheet("@supports (transform-origin: 5% 5%) { }", Rules.UnknownAtRules);
	});


	// PSEUDO CLASS
	test("pseudoClass 'active'", function(){
		assertStyleSheet("div:active { }");
	});
	test("pseudoClass 'checked'", function(){
		assertStyleSheet("div:checked { }");
	});
	test("pseudoClass 'disabled'", function(){
		assertStyleSheet("div:disabled { }");
	});
	test("pseudoClass 'empty'", function(){
		assertStyleSheet("div:empty { }");
	});
	test("pseudoClass 'enabled'", function(){
		assertStyleSheet("div:enabled { }");
	});
	test("pseudoClass 'first-child'", function(){
		assertStyleSheet("div:first-child { }");
	});
	test("pseudoClass 'focus'", function(){
		assertStyleSheet("div:focus { }");
	});
	test("pseudoClass 'hover'", function(){
		assertStyleSheet("div:hover { }");
	});
	test("pseudoClass 'last-child'", function(){
		assertStyleSheet("div:last-child { }");
	});
	test("pseudoClass 'nth-child'", function(){
		assertStyleSheet("div:nth-child() { }");
	});
	test("pseudoClass 'nth-last-child'", function(){
		assertStyleSheet("div:nth-last-child() { }");
	});
	test("pseudoClass 'nth-last-of-type'", function(){
		assertStyleSheet("div:nth-last-of-type() { }");
	});
	test("pseudoClass 'nth-of-type'", function(){
		assertStyleSheet("div:nth-of-type() { }");
	});
	test("pseudoClass 'only-child'", function(){
		assertStyleSheet("div:only-child { }");
	});
	test("pseudoClass 'root'", function(){
		assertStyleSheet("div:root { }");
	});
	test("pseudoClass 'any-link' failed", function(){
		assertStyleSheet("div:any-link { }", Rules.UnsupportedPseudoSelector);
	});
	test("pseudoClass 'autofill' failed", function(){
		assertStyleSheet("div:autofill { }", Rules.UnsupportedPseudoSelector);
	});
	test("pseudoClass 'blank' failed", function(){
		assertStyleSheet("div:blank { }", Rules.UnsupportedPseudoSelector);
	});
	test("pseudoClass 'current' failed", function(){
		assertStyleSheet("div:current { }", Rules.UnsupportedPseudoSelector);
	});
	test("pseudoClass 'default' failed", function(){
		assertStyleSheet("div:default { }", Rules.UnsupportedPseudoSelector);
	});
	test("pseudoClass 'defined' failed", function(){
		assertStyleSheet("div:defined { }", Rules.UnsupportedPseudoSelector);
	});
	test("pseudoClass 'dir()' failed", function(){
		assertStyleSheet("div:dir() { }", Rules.UnsupportedPseudoSelector);
	});


	// PSEUDO ELEMENT
	test("pseudoElement 'after'", function(){
		assertStyleSheet("div::after { }");
		assertStyleSheet("div:after { }");
	});
	test("pseudoElement 'before'", function(){
		assertStyleSheet("div::before { }");
	});
	test("pseudoElement 'slotted'", function(){
		assertStyleSheet("div::slotted { }");
		assertStyleSheet("div::slotted { }", Rules.UnsupportedPseudoSelector, "4.0.0");
	});
	test("pseudoElement 'backdrop' failed", function(){
		assertStyleSheet("div::backdrop { }", Rules.UnsupportedPseudoSelector);
	});
	test("pseudoElement 'selection' failed", function(){
		assertStyleSheet("div::selection { }", Rules.UnsupportedPseudoSelector);
	});


	// MEDIA FEATURE
	test("media feature 'height'", function(){
		assertStyleSheet("@media (height: 10px) { }");
	});
	test("media feature 'min-height'", function(){
		assertStyleSheet("@media (min-height: 10px) { }");
	});
	test("media feature 'max-height'", function(){
		assertStyleSheet("@media (max-height: 10px) { }");
	});
	test("media feature 'width'", function(){
		assertStyleSheet("@media (width: 10px) { }");
	});
	test("media feature 'min-width'", function(){
		assertStyleSheet("@media (min-width: 10px) { }");
	});
	test("media feature 'max-width'", function(){
		assertStyleSheet("@media (max-width: 10px) { }");
	});
	test("media feature 'prefers-color-scheme'", function(){
		assertStyleSheet("@media (prefers-color-scheme: dark) { }");
	});
	test("media feature 'monochrome' fails", function(){
		assertStyleSheet("@media (monochrome) { }", Rules.UnsupportedMediaFeature);
	});
	test("media feature 'aspect-ratio' fails", function(){
		assertStyleSheet("@media (aspect-ratio: 8/5) { }", Rules.UnsupportedMediaFeature);
	});

	// UNITS
	test("units", function () {
		assertStyleSheet("selector { width: 10px }");
		assertStyleSheet("selector { width: 10em }");
		assertStyleSheet("selector { width: 10xxx }", Rules.UnsupportedUnit);
	});


	// FUNCTIONS
	test("function 'calc()'", function() {
		assertStyleSheet("div { width:calc(10px + 100px);}");
	});
	test("function 'var()'", function() {
		assertStyleSheet("div { width:var(--myVar-a)}");
	});
	test("function 'rgb()'", function() {
		assertStyleSheet("div { background: rgb(31 120 50);}");
	});
	test("function 'rgba()'", function() {
		assertStyleSheet("div {background: rgba(31 120 50 50);}");
	});
	test("function 'hsl()'", function() {
		assertStyleSheet("div { background: hsl(50 80% 40%);}");
	});
	test("function 'hsla()'", function() {
		assertStyleSheet("div { background: hsla(50 80% 40% 50%);}");
	});
	test("function 'linear-gradient()'", function() {
		assertStyleSheet("div { background: linear-gradient(#e66465, #9198e5);}");
	});
	test("function 'radial-gradient()'", function() {
		assertStyleSheet("div { background: linear-gradient(#e66465, #9198e5);}");
	});
	test("function 'translate()'", function() {
		assertStyleSheet("div { transform: translate(42px, 18px);}");
	});
	test("function 'translateX()'", function() {
		assertStyleSheet("div { transform: translateX(42px);}");
	});
	test("function 'translateY()'", function() {
		assertStyleSheet("div { transform: translateY(42px);}");
	});
	test("function 'url()'", function() {
		assertStyleSheet("div { background-image: url('star.gif');}");
	});

});

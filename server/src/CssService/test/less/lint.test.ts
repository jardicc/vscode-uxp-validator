/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";

import { Rule } from "../../services/lintRules";
import { assertEntries } from "../css/lint.test";
import { SCSSParser } from "../../../CssServiceOriginal/parser/scssParser";
import { TextDocument } from "../../../CssServiceOriginal/cssLanguageTypes";

function assertRuleSet(input: string, expectedRules: Rule[] | Rule = []): void {
	const p = new SCSSParser();
	const document = TextDocument.create("test://test/test.scss", "scss", 0, input);
	const node = p.internalParse(input, p._parseRuleset)!;
	assertEntries({node, document, expectedRules});
}

suite("LESS - Lint", () => {

	test("unknown properties", function () {
		assertRuleSet("selector { box-shadow+: 0 0 20px black; }");
		assertRuleSet("selector { transform+_: rotate(15deg); }");
	});

});

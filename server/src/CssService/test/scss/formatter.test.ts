/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { getSCSSLanguageService } from "../../../CssServiceOriginal/cssLanguageService";
import { assertFormat } from "../css/formatter.test";

suite("SCSS - Formatter", () => {

	const lessLS = getSCSSLanguageService();

	test("full document", () => {
		const content = [
			"@mixin  themable( $theme-name,  $theme-map) {",
			"  @if ($section == container) {",
			".container {background-color: map-get($map, bg);}",
			"}",
			"}",
		].join("\n");

		const expected = [
			"@mixin themable($theme-name, $theme-map) {",
			"  @if ($section ==container) {",
			"    .container {",
			"      background-color: map-get($map, bg);",
			"    }",
			"  }",
			"}",
		].join("\n");

		assertFormat(content, expected, undefined, lessLS);
	});


});

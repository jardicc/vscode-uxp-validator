/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";

import * as assert from "assert";

import { getCSSLanguageService, TextDocument, TextEdit, Range, Command, CodeAction, TextDocumentEdit } from "../../../CssServiceOriginal/cssLanguageService";

suite("CSS - Code Actions", () => {

	const testCodeActions = function (value: string, tokenBefore: string, expected: { title: string; content: string; }[]) {
		const ls = getCSSLanguageService();

		const document = TextDocument.create("test://test/test.css", "css", 0, value);
		const styleSheet = ls.parseStylesheet(document);
		const offset = value.indexOf(tokenBefore);
		const startPosition = document.positionAt(offset);
		const endPosition = document.positionAt(offset + tokenBefore.length);
		const range = Range.create(startPosition, endPosition);

		ls.configure({ validate: true });

		const diagnostics = ls.doValidation(document, styleSheet);
		const commands = ls.doCodeActions(document, range, { diagnostics }, styleSheet);
		assertCodeAction(commands, document, expected);

		const codeActions = ls.doCodeActions2(document, range, { diagnostics }, styleSheet);
		assertCodeAction2(codeActions, document, expected);
	};

	const assertCodeAction = function (commands: Command[], document: TextDocument, expected: { title: string; content: string; }[]) {
		const labels = commands.map(command => command.title);

		for (const exp of expected) {
			const index = labels.indexOf(exp.title);
			assert.ok(index !== -1, "Quick fix not found: " + exp.title + " , found:" + labels.join(","));
			const command = commands[index];
			assert.equal(TextDocument.applyEdits(document, <TextEdit[]>command.arguments![2]), exp.content);
			assert.equal(command.arguments![0], document.uri);
			assert.equal(command.arguments![1], document.version);
		}
	};

	const assertCodeAction2 = function (codeActions: CodeAction[], document: TextDocument, expected: { title: string; content: string; }[]) {
		const labels = codeActions.map(command => command.title);

		for (const exp of expected) {
			const index = labels.indexOf(exp.title);
			assert.ok(index !== -1, "Quick fix not found: " + exp.title + " , found:" + labels.join(","));
			const codeAction = codeActions[index];
			for (const change of codeAction.edit!.documentChanges!) {
				if (TextDocumentEdit.is(change)) {
					assert.equal(document.uri, change.textDocument.uri);
					assert.equal(TextDocument.applyEdits(document, change.edits), exp.content);
				} else {
					assert.ok(false, "not a TextDocumentEdit");
				}

			}
		}
	};

	test("Unknown Properties", async function () {
		testCodeActions("body { /*here*/displai: inline }", "/*here*/", [
			{ title: "Rename to 'display'", content: "body { /*here*/display: inline }" },
		]);
		testCodeActions("body { /*here*/background-colar: red }", "/*here*/", [
			{ title: "Rename to 'background-color'", content: "body { /*here*/background-color: red }" },
			{ title: "Rename to 'background-clip'", content: "body { /*here*/background-clip: red }" },
			{ title: "Rename to 'background-image'", content: "body { /*here*/background-image: red }" },
		]);
	});
});

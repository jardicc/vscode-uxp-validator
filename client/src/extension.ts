/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
"use strict";

import * as path from "path";
import { ExtensionContext, window as Window } from "vscode";
import * as vscode from "vscode";
import {LanguageClient, LanguageClientOptions, RevealOutputChannelOn, ServerOptions, TransportKind} from "vscode-languageclient/node";
import {ui} from "./UI";
import * as fs from "fs";

export let client: LanguageClient;
export const extensionName = "Validator for UXP";

export async function activate(context: ExtensionContext): Promise<void> {

	const isDebugging = process.execArgv.includes("--inspect") || !!process.execArgv.find(item => item.startsWith("--inspect-brk"));
	if (isDebugging) {
		console.log("LSP server is running in debug mode.");
	} else {
		console.log("LSP server is not running in debug mode.");
	}

	/*
	const devPath = context.asAbsolutePath(path.join("server", "out", "server", "src", "server.js"));
	const prodPath = context.asAbsolutePath(path.join("server", "out", "server.js"));

	const serverModule = fs.existsSync(devPath) ? devPath : prodPath;
	*/

	const serverModule = context.asAbsolutePath(path.join("server", "out", "server", "src", "server.js"));
	console.log("serverModule", serverModule);
	//const serverModule = context.asAbsolutePath(finalPath);
	const serverOptions: ServerOptions = {
		run: {
			module: serverModule,
			// transport: {kind:TransportKind.socket, port: 9229},
			transport: TransportKind.ipc,
			options: {cwd: process.cwd()},
		},
		debug: {
			module: serverModule,
			// transport: {kind: TransportKind.socket, port: 9229},
			transport: TransportKind.ipc,
			options: {cwd: process.cwd()},
		},
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: [
			{language: "css"},
			{language: "less"},
			{language: "scss"},
			{pattern: "**/manifest.json"},
		],
		diagnosticCollectionName: "uxp",
		revealOutputChannelOn: RevealOutputChannelOn.Info,
		progressOnInitialization: true,
		synchronize: {
			// TODO figure this out - https://github.com/microsoft/vscode-languageserver-node/issues/620
			// configurationSection: "uxp",
		},
	};

	try {
		client = new LanguageClient(extensionName, serverOptions, clientOptions, true);
		client.registerProposedFeatures();

		await client.start();

		ui.start(client);

	} catch (err) {
		Window.showErrorMessage(`The extension couldn't be started. See the output channel for details.`);
		return;
	}
}

export function deactivate() {

}

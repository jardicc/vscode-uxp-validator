import * as vs from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import {getLanguageModelCache} from "./languageModelCache";
import {Validator} from "./Validator";
import {requestClient, setServerRequestHandlers} from "./serverRequestHandlers";
import {debounce} from "lodash";
import {JSONDocument} from "./manifestValidation/JsonService/jsonLanguageService";
import {IPickVersionArg, ISettings} from "../../common/types";
import {EXTENSION_ID, SERVER_REQUESTS} from "../../common/constants";

export class LSPServer{

	public static documents: vs.TextDocuments<TextDocument>;
	public static validator: Validator;
	public static settings: ISettings;
	public static connection: vs.Connection;
	private static jsonDocuments = getLanguageModelCache<JSONDocument>(10, 60, document => LSPServer.validator.jsonLs.parseJSONDocument(document));

	public static async startServer() {
		LSPServer.connection = vs.createConnection();
		const connection = LSPServer.connection;
		connection.console.info(`UXP Validator LSP server running in node ${process.version}`);



		connection.onInitialize(LSPServer.onInitialize);

		/**
		 * Once server is ready
		 */
		connection.onInitialized(LSPServer.onInitialized);

		/**
		 * Creates tool tip on mouse hover over the code
		 */
		connection.onHover(LSPServer.onHover);

		/**
		 * Creates an intellisense list and also shows documentation per item in the list
		 */
		connection.onCompletion(LSPServer.onCompletion);

		/**
		 * Can be used to modify item in completion list... e.g. add calculated quirks into docs
		 */
		connection.onCompletionResolve((item: vs.CompletionItem): vs.CompletionItem => {
			console.log("Completion resolve:", item);
			return item;
		});

		LSPServer.documents = new vs.TextDocuments(TextDocument);
		LSPServer.documents.listen(connection);
		connection.listen(); // After all is prepared

	}

	private static getDocument(arg: vs.HoverParams | vs.TextDocumentPositionParams): TextDocument | undefined {
		return LSPServer.documents.get(arg.textDocument.uri);
	}

	private static getJSONDocument(document: TextDocument): JSONDocument {
		return LSPServer.jsonDocuments.get(document);
	}

	public static async onEnableValidator(enable: boolean) {
		console.log("Server got: ", SERVER_REQUESTS.ENABLE_VALIDATOR, enable);
		if (enable) {
			await LSPServer.validator.start();
		} else {
			await LSPServer.validator.stop();
		}
		requestClient.enableValidator(LSPServer.validator.enabled);
	}

	public static async onSetVersion(arg: IPickVersionArg) {
		console.log("Server got: ", SERVER_REQUESTS.SET_VERSION, arg);
		// await switchVersion(arg);
		requestClient.setVersion(LSPServer.validator.versionMatcher.activeUXPVersion);
	}

	public static async onRestartServer() {
		console.log("Server got: ", SERVER_REQUESTS.RESTART_SERVER);
		await LSPServer.validator.stop();
		await LSPServer.validator.start();
	}

	/**
	 * Only re-validate document if there is no validation request for at least 200ms
	 * This is to save CPU
	 */
	private static onDidChangeContentDebounced = debounce((event) => {
		LSPServer.validator.update(event.document);
	}, 0);

	private static async onInitialized() {
		console.log("Server initialized start");
		await LSPServer.fetchSettings();
		// Set how to handle requests from client
		setServerRequestHandlers(LSPServer.connection);
		LSPServer.validator = new Validator(); // TODO improve instantiation
		await LSPServer.validator.start();

		/**
		 * Validate newly opened document by default
		 */
		LSPServer.documents.onDidOpen(async (event) => {
			await LSPServer.validator.update(event.document);
		});

		LSPServer.documents.onDidChangeContent(LSPServer.onDidChangeContentDebounced);

		// Send messages to client once server is ready
		LSPServer.updateClientUI();

		console.log("Server initialized done");
	}

	private static updateClientUI() {
		requestClient.enableValidator(LSPServer.validator.enabled);
		requestClient.setVersion(LSPServer.validator.versionMatcher.activeUXPVersion);
	}

	public static async fetchSettings():Promise<void> {
		const config: ISettings = await LSPServer.connection.workspace.getConfiguration(EXTENSION_ID);
		LSPServer.settings = config;
	}

	private static async onHover(textDocumentPosition: vs.HoverParams): Promise<vs.Hover | null> {
		if (!LSPServer.validator.enabled) {
			return null;
		}
		// return runSafeAsync(runtime, async () => {
		const document = LSPServer.getDocument(textDocumentPosition);
		if (!document) {
			return null;
		}

		switch (document.languageId) {
			case "json": {
				const jsonDocument = LSPServer.getJSONDocument(document);
				const res = await LSPServer.validator.jsonLs.doHover(document, textDocumentPosition.position, jsonDocument);
				return res;
			}
			default: {
				return null;
			}
		}
		// }, null, `Error while computing hover for ${vs.textDocumentPositionParams.textDocument.uri}`, token);
	}

	private static async onCompletion(textDocumentPosition: vs.TextDocumentPositionParams): Promise<vs.CompletionItem[]|null> {
		// debugger;
		if (!LSPServer.validator.enabled) {
			return null;
		}
		const document = LSPServer.getDocument(textDocumentPosition);
		if (!document) {
			return null;
		}

		switch (document.languageId) {
			case "json": {
				const jsonDocument = LSPServer.getJSONDocument(document);

				const list: vs.CompletionList | null = await LSPServer.validator.jsonLs.doComplete(
					document,
					textDocumentPosition.position,
					jsonDocument,
				);


				const res = list?.items ?? [];
				console.log("Completion:", res);

				return res;

			}
			default: {
				return null;
			}
		}
	}

	private static onInitialize() {
		console.log("Server initialize");

		const res: vs.InitializeResult = {
			capabilities: {
				completionProvider: {
					resolveProvider: true,
					triggerCharacters: ["\"", ":"],

				},
				textDocumentSync: {
					openClose: true,
					change: vs.TextDocumentSyncKind.Incremental,
				},
				inlayHintProvider: {
					documentSelector: [
						{
							language: "json",
							pattern: "**/manifest.json",
						},
					],
					resolveProvider: true,
					id: "uxpManifestInlayHints",
				},
				inlineValueProvider: {
					documentSelector: [{
						language: "json",
						pattern: "**/manifest.json",
					}],
				},
				hoverProvider: true,
				workspace: {
					workspaceFolders: {
						supported: true,
					},
				},
			},
		};

		return res;

		// VSCODE built-in
		/*
			const capabilities: ServerCapabilities = {
				vs.textDocumentSync: vs.TextDocumentSyncKind.Incremental,
				completionProvider: clientSnippetSupport ? {
					resolveProvider: false, // turn off resolving as the current language service doesn't do anything on resolve. Also fixes #91747
					triggerCharacters: ['"', ':']
				} : undefined,
				hoverProvider: true,
				documentSymbolProvider: true,
				documentRangeFormattingProvider: initializationOptions.provideFormatter === true,
				documentFormattingProvider: initializationOptions.provideFormatter === true,
				colorProvider: {},
				foldingRangeProvider: true,
				selectionRangeProvider: true,
				documentLinkProvider: {},
				diagnosticProvider: {
					documentSelector: null,
					interFileDependencies: false,
					workspaceDiagnostics: false
				},
				codeActionProvider: true
			};
		*/
	}
}
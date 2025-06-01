import * as style from "./CssServiceOriginal/cssLanguageService";
import {InlayHintLabelPart, Position, TextEdit} from "vscode-languageserver/node";
import * as json from "./manifestValidation/JsonService/jsonLanguageService";
import {V5Schema} from "./manifestValidation/Schemas/V5Schema";
import {v4Schema} from "./manifestValidation/Schemas/V4Schema";
import {VersionMatcherFromFile} from "../../common/VersionMatcher";
import {makeInlayHints} from "./manifestValidation/inlayHint";
import {JSONDocument} from "./manifestValidation/JsonService/parser/jsonParser";
import {getQuirks} from "./manifestValidation/jsonQuirksDetector";
import {readFile} from "fs/promises";
import globby from "globby";
import {fileURLToPath} from "url";
import {LSPServer} from "./LSPServer";
import {requestClient} from "./serverRequestHandlers";
import {unsupportedSchema} from "./manifestValidation/Schemas/unsupportedSchema";
import {V6Schema} from "./manifestValidation/Schemas/V6Schema";
import {jsonrepair} from "jsonrepair";

export class Validator {

	private cssLs: style.LanguageService;
	private lessLs: style.LanguageService;
	private scssLs: style.LanguageService;
	public jsonLs: json.LanguageService;

	private readonly v6manifestUri = "foo://server/v6manifest.schema.json";
	private readonly v5manifestUri = "foo://server/v5manifest.schema.json";
	private readonly v4manifestUri = "foo://server/v4manifest.schema.json";
	private readonly unsupportedManifestUri = "foo://server/unsupportedManifes.schema.json";

	private _enabled = true;
	private _manifestVersion = 5; // important
	private manifestUri = this.v5manifestUri; // important
	private _versionMatcher: VersionMatcherFromFile;

	private manifestMatchPattern:string[] = ["manifest.json"];

	constructor() {
		this._versionMatcher = new VersionMatcherFromFile(null, LSPServer.settings);
		this.cssLs = style.getCSSLanguageService();
		this.lessLs = style.getLESSLanguageService();
		this.scssLs = style.getSCSSLanguageService();
		this.jsonLs = json.getLanguageService({
			schemaRequestService: this.schemaRequestServiceHandler,
			clientCapabilities: json.ClientCapabilities.LATEST,
		});
		this.configureJsonLs();
		/*
		connection.onExecuteCommand(async (params) => {
			console.log("onExecuteCommand");
			console.log(params);
			debugger;
		});
		*/
	}

	public get versionMatcher(): VersionMatcherFromFile {
		return this._versionMatcher;
	}

	/**
	 * Automatically detect manifest version based on file content
	 * @param fileContent
	 */
	private assignManifestVersionFromContent(fileContent: string):void {
		try {
			const repairedJSON = jsonrepair(fileContent);
			const obj = JSON.parse(repairedJSON);
			switch (obj?.manifestVersion) {
				case 4:
					this.manifestVersion = 4;
					break;
				case 5:
					this.manifestVersion = 5;
					break;
				case 6:
					this.manifestVersion = 6;
					break;
				default: {
					this.manifestVersion = -1;
				}
			}
		}
		catch (e) {
			this.manifestVersion = -1;
		}
	}

	private async initVersionMatcher(content: string|null): Promise<void>{
		const versionMatcher = new VersionMatcherFromFile(content, LSPServer.settings);
		if (versionMatcher.hasError) {
			return;
		}
		this._versionMatcher = versionMatcher;
	}

	/**
	 * Load scheme based on URI
	 * @param uri
	 * @returns
	 */
	private schemaRequestServiceHandler = (uri: string) => {
		switch (uri) {
			case this.v4manifestUri:
				return Promise.resolve(JSON.stringify(v4Schema));
			case this.v5manifestUri:
				return Promise.resolve(JSON.stringify(V5Schema));
			case this.v6manifestUri:
				return Promise.resolve(JSON.stringify(V6Schema));
			default:
				return Promise.resolve(JSON.stringify(unsupportedSchema));
				//return Promise.reject(`Unable to load schema at ${uri}`);
		}
	};

	/**
	 * Assign scheme URI to the document
	 */
	private configureJsonLs() {
		switch (this.manifestVersion) {
			case 4:
				this.manifestUri = this.v4manifestUri;
				break;
			case 5:
				this.manifestUri = this.v5manifestUri;
				break;
			case 6:
				this.manifestUri = this.v6manifestUri;
				break;
			case -1:
			default: {
				this.manifestUri = this.unsupportedManifestUri;
			}
		}
		this.jsonLs.configure({
			allowComments: false,
			validate: true,
			schemas: [
				{
					fileMatch: this.manifestMatchPattern,
					uri: this.manifestUri,
				},
			],
		});
	}

	/**
	 * Will switch manifest.json validation from one schema to another and affect intellisense and reported errors
	 */
	private set manifestVersion(value: number) {
		if (this._manifestVersion === value) {
			return; // no change
		}
		this._manifestVersion = value;
		this.configureJsonLs();

	}

	private get manifestVersion(): number {
		return this._manifestVersion;
	}

	public get enabled(): boolean {
		return this._enabled;

	}

	/**
	 * Will validate all documents
	 */
	private validateAllDocs() {
		LSPServer.documents.all().forEach(this.update.bind(this));
	}

	/**
	 * Start validation
	 */
	public async start(): Promise<void> {
		this._enabled = true;
		this.inlineHintExperiment(); // ! FIXME - inLay hints shows error without this one
		await LSPServer.fetchSettings();
		await this.updateManifestFile();
		this.validateAllDocs();
		console.log("activate");
	}

	private async findManifestFiles(): Promise<string[]> {
		const folders = await LSPServer.connection.workspace.getWorkspaceFolders();
		if (!folders || folders.length === 0) {
			return [];
		}

		const workspace = folders[0];
		const cwdPath = fileURLToPath(workspace.uri);
		const found = await globby("**/manifest.json", {cwd: cwdPath, gitignore: true, ignore: ["**/node_modules/**"], absolute: true});
		return found;

	}

	// will send found manifest file for validation
	private async updateManifestFile(): Promise<void> {
		const files = await this.findManifestFiles();
		if (files.length === 0) {
			return;
		}
		const fileContent = await readFile(files[0], "utf-8");

		await this.initVersionMatcher(fileContent);
		//const firstApp = this.versionMatcher.App;
		/*
		const app = firstApp?.app ?? "PS";
		const version = firstApp?.safeAppVersion ?? "1.0.0";
		const common = this.versionMatcher.commonUXP?.uxp ?? "7.0.0";
		*/
		/*
		await switchVersion({
			app: app,
			uxpVersion: common,
			version,
		});
		*/
		// TODO - Should I restart server here? Or clean something?
		requestClient.setVersion(this.versionMatcher.activeUXPVersion);
	}

	/**
	 * Stop validation
	 */
	public async stop(): Promise<void> {
		this._enabled = false;
		await this.cleanAll();
		console.log("deactivate");
		await LSPServer.fetchSettings(); // this before initVersionMatcher
		await this.initVersionMatcher(null);
	}

	private pickStyleLanguageService(document: json.TextDocument): style.LanguageService {
		switch (document.languageId) {
			case "css":
				return this.cssLs;
			case "less":
				return this.lessLs;
			case "scss":
				return this.scssLs;
		}
		throw new Error("Unknown languageId: " + document.languageId);
	}

	/**
	 * Clean all diagnostics
	 */
	private async cleanAll() {
		// clean all diagnostics
		const promises = LSPServer.documents.all().map((document) =>
			LSPServer.connection.sendDiagnostics({uri: document.uri, diagnostics: []}),
		);
		await Promise.allSettled(promises);
		// clean inlay hints
		console.log("clean inlay hints");
		this.inlineHintExperiment();
	}

	private inlineHintExperiment(document?: json.TextDocument, jsonDocument?: json.JSONDocument) {

		LSPServer.connection.languages.inlayHint.resolve((hint) => {
			if (typeof hint.label === "string") {
				hint.label = [InlayHintLabelPart.create(hint.label)];
			}
			for (let i = 0; i < hint.label.length; i++) {
				let value = hint.label[i].value;
				value = value.replace(" = ", "").split("|").map(str => str.trim()).join("\n");
				hint.label[i].tooltip = value;
			}
			return hint;
		});

		LSPServer.connection.languages.inlayHint.on((arg) => {
			if (!this.enabled) {
				return [];
			}
			// removes all inlay hints if no argument is passed
			if (!document || !jsonDocument) {
				return [];
			}

			if (!arg.textDocument.uri.endsWith("manifest.json")) {
				return [];
			}
			if (!this._versionMatcher) {
				return [];
			}
			const res = makeInlayHints(document, jsonDocument as JSONDocument, this._versionMatcher);
			return res;
		});
	}

	/**
	 * Update validation
	 * @param document
	 */
	public async update(document: json.TextDocument): Promise<void>{

		if (!this.enabled) {
			return;
		}
		switch (document.languageId) {
			case "css":
			case "less":
			case "scss": {
				const ls = this.pickStyleLanguageService(document);
				const styleSheet = ls.parseStylesheet(document);
				ls.configure({validate: true});
				const diagnostics = ls.doValidation(document, styleSheet);
				LSPServer.connection.sendDiagnostics({uri: document.uri.toString(), diagnostics});
				break;
			}
			case "json": {
				if (!document.uri.endsWith("manifest.json")) {
					return; // only validate manifest.json
				}
				const text = document.getText();
				this.assignManifestVersionFromContent(text);
				await this.initVersionMatcher(text);

				const jsonDocument = this.jsonLs.parseJSONDocument(document);

				const diagnostics: json.Diagnostic[] = await this.jsonLs.doValidation(document, jsonDocument, {
					schemaValidation: "error",
					comments: "error",
					trailingCommas: "error",
				});
				const quirkDiagnostics: json.Diagnostic[] = getQuirks(jsonDocument as JSONDocument, document);

				const mergeDiagnostics = [...diagnostics, ...quirkDiagnostics];

				LSPServer.connection.sendDiagnostics({uri: document.uri.toString(), diagnostics: mergeDiagnostics});

				this.inlineHintExperiment(document, jsonDocument);

				break;
			}
		}
	}
}

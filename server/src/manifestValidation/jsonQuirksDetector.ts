import {LSPServer} from "../LSPServer";
import {Validator} from "../Validator";
import * as json from "./JsonService/jsonLanguageService";
import {JSONDocument, getNodePath, getNodeValue} from "./JsonService/parser/jsonParser";
import {satisfies} from "semver";


function addProblem(node: json.ASTNode, message: string, severity: json.DiagnosticSeverity, diagnostics: json.Diagnostic[], textDocument: json.TextDocument) {

	const range = json.Range.create(textDocument.positionAt(node.offset), textDocument.positionAt(node.offset + node.length));

	const diagnostic: json.Diagnostic = {
		severity,
		message,
		range,
		code: "UXP Validator - Custom",
	};
	diagnostics.push(diagnostic);
}

export function handleMenuRecording(node: json.ASTNode, textDocument: json.TextDocument, diagnostic: json.Diagnostic[]): void {
	/*
		loadEvent - Photoshop 23.1 and later
	*/
	if (node.type === "property" && node.keyNode.value === "enableMenuRecording" && node.valueNode?.value === true) {
		const nodePath = getNodePath(node);

		const strPath = nodePath.join(".");
		if (!strPath.includes(".data")) {
			return;
		}

		const PSversion = LSPServer.validator.versionMatcher?.detectedVersions?.PS;
		if (!PSversion) {
			return;
		}

		if (satisfies(PSversion, "<25.0.0")) {
			addProblem(node, `loadEvent is "true" but this has only effect in Photoshop ">=25.0.0"`, json.DiagnosticSeverity.Error, diagnostic, textDocument);
		}
	}
}

export function handleLoadEvent(node: json.ASTNode, textDocument: json.TextDocument, diagnostic: json.Diagnostic[]): void {
	/*
		loadEvent - Photoshop 23.1 and later
	*/
	if (node.type === "property" && node.keyNode.value === "loadEvent" && node.valueNode?.type === "string") {
		const nodePath = getNodePath(node);

		const strPath = nodePath.join(".");
		if (!strPath.includes(".data")) {
			return;
		}

		const loadEvent = node.valueNode.value;
		const PSversion = LSPServer.validator.versionMatcher?.detectedVersions?.PS;
		if (!PSversion) {
			return;
		}

		if (satisfies(PSversion, "<23.1.0") && loadEvent === "startup") {
			addProblem(node, `loadEvent is "${loadEvent}" but this has only effect in Photoshop ">=23.1.0"`, json.DiagnosticSeverity.Error, diagnostic, textDocument);
		}

	}
}

export function handlePSApiVersion(node: json.ASTNode, textDocument: json.TextDocument, diagnostic: json.Diagnostic[]): void {
	/*
		# apiVersion

		Default value
		The apiVersion field is optional. Its default value depends on the version of Photoshop that a plugin is targeting:

		A plugin whose minimum version is less than 23.0.0, will be assigned an apiVersion of 1 unless the plugin specifies otherwise in its manifest.
		A plugin whose minimum version is 23.0.0, or greater, will be assigned an apiVersion of 2 unless the plugin specifies otherwise in its manifest.
	*/
	if (node.type === "property" && node.keyNode.value === "apiVersion" && node.valueNode?.type === "number") {
		const nodePath = getNodePath(node);

		const strPath = nodePath.join(".");
		if (!strPath.includes(".data")) {
			return;
		}

		const apiVersion = node.valueNode.value;
		const PSversion = LSPServer.validator.versionMatcher?.detectedVersions?.PS;
		if (!PSversion) {
			return;
		}

		if(satisfies(PSversion,"<23.0.0") && apiVersion !== 1) {
			addProblem(node, `apiVersion is ${apiVersion} is not supported in PS version ${PSversion}. minVersion ">=23.0.0" is required`, json.DiagnosticSeverity.Error, diagnostic, textDocument);
		}
		else if(satisfies(PSversion,">=23.0.0") && apiVersion === 2) {
			addProblem(node, `apiVersion is ${apiVersion} but since PS 23.0.0 there is not need to explicitly specify apiVersion 2`, json.DiagnosticSeverity.Information, diagnostic, textDocument);
		}else if(satisfies(PSversion,">=23.0.0") && apiVersion === 1) {
			addProblem(node, `apiVersion ${apiVersion} is deprecated. Please consider to use apiVersion 2`, json.DiagnosticSeverity.Warning, diagnostic, textDocument);
		}

	}
}

export function handleFlags(node: json.ASTNode, textDocument: json.TextDocument, diagnostic: json.Diagnostic[]): void {

	// If we are not directly in the featureFlags object, return (nested featureFlags are not supported)
	const nodePath = getNodePath(node);
	if (!nodePath.includes("featureFlags")) {
		return;
	}


	/*
		enableSWCSupport 7.0
	*/
	if (node.type === "property" && node.keyNode.value === "enableSWCSupport" && node.valueNode?.value === true) {
		//const nodePath = getNodePath(node);

		/*
		const strPath = nodePath.join(".");
		if (!strPath.includes("featureFlags")) {
			return;
		}
		*/

		const uxpVersion = LSPServer.validator.versionMatcher?.commonUXP?.uxp;

		if (!uxpVersion) {
			return;
		}

		if (satisfies(uxpVersion, "<7.0.0")) {
			addProblem(node, `enableSWCSupport is not supported in UXP version ${uxpVersion}. UXP version should be >=7.0.0`, json.DiagnosticSeverity.Error, diagnostic, textDocument);
		}
	}
	// Enable alerts
	if (node.type === "property" && node.keyNode.value === "enableAlerts" && node.valueNode?.value === true) {
		const uxpVersion = LSPServer.validator.versionMatcher?.commonUXP?.uxp;
		const PSversion = LSPServer.validator.versionMatcher?.detectedVersions?.PS;
		const InDesignVersion = LSPServer.validator.versionMatcher?.detectedVersions?.ID;

		if (!uxpVersion) {
			return;
		}

		if (PSversion && satisfies(uxpVersion, "<7.0.0")) {
			addProblem(node, `In Photoshop: enableAlerts is not supported in UXP version ${uxpVersion}. UXP version should be >=7.0.0`, json.DiagnosticSeverity.Error, diagnostic, textDocument);
		}

		else if (InDesignVersion && satisfies(uxpVersion, "<7.3.0")) {
			addProblem(node, `In InDesign: enableAlerts is not supported in UXP version ${uxpVersion}. UXP version should be >=7.3.0`, json.DiagnosticSeverity.Error, diagnostic, textDocument);
		}

		else if (satisfies(uxpVersion, "<7.0.0")) {
			addProblem(node, `enableAlerts is not supported in UXP version ${uxpVersion}. UXP version should be >=7.0.0`, json.DiagnosticSeverity.Error, diagnostic, textDocument);
		}
	}
	// Enable fill as custom attribute
	if (node.type === "property" && node.keyNode.value === "enableFillAsCustomAttribute" && node.valueNode?.value === true) {
		const uxpVersion = LSPServer.validator.versionMatcher?.commonUXP?.uxp;

		if (!uxpVersion) {
			return;
		}

		if (satisfies(uxpVersion, ">=8.1.0")) {
			addProblem(node, `You don't need this. \`enableFillAsCustomAttribute\` is turned on by default since UXP version 8.1.0. You target minimal UXP version ${uxpVersion}.`, json.DiagnosticSeverity.Warning, diagnostic, textDocument);
		}
	}
	// Enable SWC support overrides CSS Next Support
	if (node.type === "property" && node.keyNode.value === "CSSNextSupport") {
		node.parent?.children?.find((child) => {
			if (child.type === "property" && child.keyNode.value === "enableSWCSupport" && child.valueNode?.value === true) {
				addProblem(node, `\`CSSNextSupport\` is always enabled when \`enableSWCSupport\` is enabled.`, json.DiagnosticSeverity.Error, diagnostic, textDocument);

				// CSSNextSupport cannot be an array if enableSWCSupport is enabled
				if (node.valueNode?.type === "array") {
					addProblem(node, `\`CSSNextSupport\` cannot be an array and must be set to true or omitted when \`enableSWCSupport\` is enabled.`, json.DiagnosticSeverity.Error, diagnostic, textDocument);
				}
			}
		});
	}
}

export function handlePermissions(node: json.ASTNode, textDocument: json.TextDocument, diagnostic: json.Diagnostic[]): void {
	/*
		network							uxp 6.0.0
		webview							uxp 6.0.0
		localFileSystem					uxp 6.0.0
		launchProcess					uxp 6.0.0
		ipc								uxp 6.0.0
		allowCodeGenerationFromStrings	uxp 6.0.0
		fonts							uxp 6.0.0
		clipboard						uxp 6.0.0
		enableAddon						ps 24.2.0, id n/a, xd n/a, (uxp 6.2.0)
		enableUserInfo					uxp 7.3.0 implemented but fixed in 7.4.0
	*/

	if (node.type === "property" && node.keyNode.value === "enableUserInfo" && node.valueNode?.value === true) {
		// TODO - change this to PS only
		const uxpVersion = LSPServer.validator.versionMatcher?.commonUXP?.uxp;
		const PSversion = LSPServer.validator.versionMatcher?.detectedVersions?.PS;

		if (!uxpVersion) {
			return;
		}
		if (!PSversion) {
			addProblem(node, `enableUserInfo is currently supported only in Photoshop`, json.DiagnosticSeverity.Error, diagnostic, textDocument);
		}

		if (satisfies(uxpVersion, "<7.4.0")) {
			addProblem(node, `enableUserInfo is not supported in UXP version ${uxpVersion}. And in 7.3.0 it returned same empty string hash for multiple different users. Reliable UXP version should be >=7.4.0`, json.DiagnosticSeverity.Error, diagnostic, textDocument);
		}
	}
	if (node.type === "property" && node.keyNode.value === "enableAddon" && node.valueNode?.value === true) {
		const psVersion = LSPServer.validator.versionMatcher?.detectedVersions?.PS;

		if (!psVersion) {
			return;
		}

		if(satisfies(psVersion, "<24.2.0")) {
			addProblem(node, `enableAddon is not supported in UXP version ${psVersion}. UXP version should be >=24.2.0`, json.DiagnosticSeverity.Error, diagnostic, textDocument);
		}
	}
	if (node.type === "property" && node.keyNode.value === "allowLocalRendering") {
		const uxpVersion = LSPServer.validator.versionMatcher?.commonUXP?.uxp;

		if (!uxpVersion) {
			return;
		}

		if (satisfies(uxpVersion, "<8.0.1")) {
			addProblem(node, `allowLocalRendering is not supported in UXP version ${uxpVersion}. UXP version should be >=8.0.1`, json.DiagnosticSeverity.Error, diagnostic, textDocument);
		}
	}
	if (node.type === "property" && node.keyNode.value === "enableMessageBridge" && node.valueNode?.value === "localOnly") {
		const uxpVersion = LSPServer.validator.versionMatcher?.commonUXP?.uxp;

		if (!uxpVersion) {
			return;
		}

		if (satisfies(uxpVersion, "<8.0.1")) {
			addProblem(node, `"localOnly" value is not supported in UXP version ${uxpVersion}. UXP version should be >=8.0.1`, json.DiagnosticSeverity.Error, diagnostic, textDocument);
		}
	}
}

export function handleManifestVersion(node: json.ASTNode, textDocument: json.TextDocument, diagnostic: json.Diagnostic[]): void {
	/*
		? manifest version 6 -> Photoshop 24.4.0 and above ?

		manifest version 5 -> Photoshop 23.3.0 and above
		manifset version 5 -> InDesign 18.5.0 and above
		manifest version 5 -> XD 52.0.0 and above

		manifest version 4 -> Photoshop 22.0.0 - 23.2.x
		manifest version 4 -> XD 36 - 52
	*/
	if (node.type === "property" && node.keyNode.value === "manifestVersion" && node.valueNode?.type === "number") {
		const nodePath = getNodePath(node);

		if (nodePath.length !== 0) {
			return;
		}

		const manifestVersion = node.valueNode.value;

		if (!LSPServer.validator.versionMatcher) {
			return;
		}

		const detectedVersions = LSPServer.validator.versionMatcher.detectedVersions;
		if (!detectedVersions) {
			return;
		}
		const UXP = LSPServer.validator.versionMatcher.commonUXP?.uxp;
		if (!UXP) {
			return;
		}

		const {ID, PS, XD} = detectedVersions;

		if (ID) {
			if (manifestVersion === 5 && !satisfies(ID, ">=18.5.0")) {
				addManifestVersionProblem("InDesign", ID, ">=18.5.0");
			} else if (manifestVersion !== 5) {
				addManifestVersionProblem("InDesign", ID);
			}
		}
		if (PS) {
			if (manifestVersion === 4 && !satisfies(PS, ">=22.0.0")) {
				addManifestVersionProblem("Photoshop", PS, ">=22.0.0");
			} else if (manifestVersion === 5 && !satisfies(PS, ">=23.3.0")) {
				addManifestVersionProblem("Photoshop", PS, ">=23.3.0");
			} else if (manifestVersion === 6 && !satisfies(PS, ">=24.4.0")) {
				addManifestVersionProblem("Photoshop", PS, ">=24.4.0");
			} else if (manifestVersion < 4 || manifestVersion > 6) {
				addManifestVersionProblem("Photoshop", PS);
			}
		}
		if (XD) {
			if (manifestVersion === 5 && !satisfies(XD, ">=52.0.0")) {
				addManifestVersionProblem("Experience Designer", XD, ">=52.0.0");
			} else if (manifestVersion === 4 && !satisfies(XD, ">=36.0.0")) {
				addManifestVersionProblem("Experience Designer", XD, ">=36.0.0");
			} else if (manifestVersion < 3 || manifestVersion > 5) {
				addManifestVersionProblem("Experience Designer", XD);
			}
		}

		// eslint-disable-next-line no-inner-declarations
		function addManifestVersionProblem(app: string, hostAppVer: string, suggestion?: string) {
			let message = `${app} ${hostAppVer} does not support manifest version ${manifestVersion}`;
			message += suggestion ? `. Manifest version ${manifestVersion} needs ${app} ${suggestion}` : "";

			addProblem(node, message, json.DiagnosticSeverity.Error, diagnostic, textDocument);
		}
	}
}



export function getQuirks(jsonDocument: JSONDocument, textDocument: json.TextDocument) {
	const diagnostics: json.Diagnostic[] = [];

	if (!jsonDocument.root) {
		return diagnostics;
	}

	jsonDocument.visit((node) => {
		const args: [json.ASTNode, json.TextDocument, json.Diagnostic[]] = [node, textDocument, diagnostics];

		handleManifestVersion(...args);
		handlePSApiVersion(...args);
		handleFlags(...args);
		handleLoadEvent(...args);
		handleMenuRecording(...args);
		handlePermissions(...args);

		return true;
	});

	return diagnostics;
}
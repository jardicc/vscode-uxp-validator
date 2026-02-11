import {InlayHint, InlayHintKind, InlayHintLabelPart} from "vscode-languageserver/node";
import * as json from "./JsonService/jsonLanguageService";
import {JSONDocument, getNodePath, getNodeValue} from "./JsonService/parser/jsonParser";
import {VersionMatcherFromFile, dateToYMD} from "../../../common/VersionMatcher";

export function makeInlayHints(document: json.TextDocument, jsonDocument: JSONDocument, versionMatcher: VersionMatcherFromFile):InlayHint[] {
	if (!jsonDocument.root) {
		return [];
	}

	const res: InlayHint[] = [];

	jsonDocument.visit((node) => {
		// Check min version
		if (node.type === "property" && node.keyNode.value === "minVersion" && node.valueNode?.type === "string") {
			const nodePath = getNodePath(node);
			// Check for parents
			if ((nodePath[0] !== "host" && nodePath[0] !== "hosts") || nodePath.length > 2) {
				return true;
			}

			const nodeValue = getNodeValue(node.parent as json.ASTNode);
			const {app, minVersion} = nodeValue;

			const pos = document.positionAt(node.valueNode.offset + node.valueNode.length);

			const versionInfo = versionMatcher.getSafeKnownVersion(app);
			if (!versionInfo) {
				return true;
			}
			const {date,es,safeAppVersion,uxp,v8} = versionInfo;

			const hintLabel = InlayHintLabelPart.create(` = UXP: ${uxp} | ${dateToYMD(date)} | V8: ${v8} | ES${es}`);

			const one = InlayHint.create(pos, [hintLabel], InlayHintKind.Parameter);
			one.data = "1";
			res.push(one);
			return false; // Do not visit children
		}


		return true;
	});

	return res;
}
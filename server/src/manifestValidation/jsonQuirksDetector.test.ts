import * as assert from "assert";
import {ISettings} from "../../../common/types";
import {VersionMatcherFromFile} from "../../../common/VersionMatcher";
import {LSPServer} from "../LSPServer";
import {Validator} from "../Validator";
import * as json from "./JsonService/jsonLanguageService";
import {JSONDocument} from "./JsonService/parser/jsonParser";
import {getQuirks} from "./jsonQuirksDetector";

const settings: ISettings = {
	autoDetectVersion: true,
	enabled: true,
	version: "7.0.0",
};

// TODO - rework manifests tests
function diagnosticsFor(manifest: object): json.Diagnostic[] {
	const content = JSON.stringify(manifest);
	const document = json.TextDocument.create("test://test/manifest.json", "json", 0, content);
	const jsonDocument = json.getLanguageService({}).parseJSONDocument(document);
	const versionMatcher = new VersionMatcherFromFile(content, settings);

	LSPServer.validator = {versionMatcher} as unknown as Validator;
	return getQuirks(jsonDocument as JSONDocument, document);
}

function manifest(minVersion: string, values: object): object {
	return {
		manifestVersion: 5,
		host: {app: "PS", minVersion},
		...values,
	};
}

suite("JSON quirks", () => {
	test("CSSNextSupport requires UXP 8.0.1", () => {
		const unsupported = diagnosticsFor(manifest("25.5.0", {
			featureFlags: {CSSNextSupport: true},
		}));
		const supported = diagnosticsFor(manifest("26.0.0", {
			featureFlags: {CSSNextSupport: true},
		}));

		assert.ok(unsupported.some(item => item.message.includes("UXP version should be >=8.0.1")));
		assert.ok(!supported.some(item => item.message.includes("CSSNextSupport` is not supported")));
	});

	test("rejects top-level domain wildcards since UXP 7.4", () => {
		const beforeChange = diagnosticsFor(manifest("25.2.0", {
			requiredPermissions: {network: {domains: ["https://*.com"]}},
		}));
		const afterChange = diagnosticsFor(manifest("25.5.0", {
			requiredPermissions: {network: {domains: ["https://*.com"]}},
		}));
		const validSubdomain = diagnosticsFor(manifest("25.5.0", {
			requiredPermissions: {webview: {domains: ["https://*.example.com"], allow: "yes"}},
		}));

		assert.ok(!beforeChange.some(item => item.message.includes("Top-level domain wildcards")));
		assert.ok(afterChange.some(item => item.message.includes("Top-level domain wildcards")));
		assert.ok(!validSubdomain.some(item => item.message.includes("Top-level domain wildcards")));
	});
});
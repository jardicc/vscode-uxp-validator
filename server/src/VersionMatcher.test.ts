import * as assert from "assert";
import {ISettings, TDetectedVersions} from "../../common/types";
import {VersionMatcher} from "../../common/VersionMatcher";

const settings: ISettings = {
	autoDetectVersion: true,
	enabled: true,
	version: "7.0.0",
};

function matcher(versions: Partial<TDetectedVersions>): VersionMatcher {
	return new VersionMatcher({
		ID: "",
		PS: "",
		XD: "",
		premierepro: "",
		...versions,
	}, settings);
}

suite("VersionMatcher", () => {
	test("matches current Photoshop versions", () => {
		assert.equal(matcher({PS: "27.7.0"}).activeUXPVersion, "9.3.0");
		assert.equal(matcher({PS: "26.1.0"}).activeUXPVersion, "8.1.0");
		assert.equal(matcher({PS: "26.0.0"}).activeUXPVersion, "8.1.0");
	});

	test("matches Premiere versions", () => {
		const versionMatcher = matcher({premierepro: "26.2.0"});

		assert.equal(versionMatcher.Premiere?.uxp, "9.2.1");
		assert.equal(versionMatcher.App?.app, "premierepro");
	});

	test("uses the lowest UXP version shared by all hosts", () => {
		const versionMatcher = matcher({PS: "27.7.0", premierepro: "26.2.0"});

		assert.equal(versionMatcher.commonUXP?.uxp, "9.2.1");
	});
});
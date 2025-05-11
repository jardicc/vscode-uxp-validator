import {ICommonUXP, IFirstSafeAppVersion, IHostApp, ISafeAppVersion, ISettings, TDetectedVersions, THostApp, supportedApps} from "./types";
import {IV8Item, v8Versions, versionTable} from "./versionTable";
import {maxSatisfying, compare, rcompare} from "semver";
import type {compare as TCompare} from "semver";
import {lte} from "semver";

export class VersionMatcher {

	private _detectedVersions: TDetectedVersions;
	protected _fileLoadOK = false;
	protected _settings: ISettings;

	constructor(detectedVersions: TDetectedVersions, settings:ISettings) {
		this._detectedVersions = detectedVersions;
		this._settings = settings;
	}

	public get App(): IFirstSafeAppVersion | null {
		if (this.PS) {
			return {...this.PS, app: "PS"};
		} else if (this.ID) {
			return {...this.ID, app: "ID"};
		} else if (this.XD) {
			return {...this.XD, app: "XD"};
		} else {
			return null;
		}
	}

	public get PS(): ISafeAppVersion | null {
		return this.getSafeKnownVersion("PS");
	}

	public get ID(): ISafeAppVersion | null {
		return this.getSafeKnownVersion("ID");
	}

	public get XD(): ISafeAppVersion | null {
		return this.getSafeKnownVersion("XD");
	}

	private get detectedApps(): THostApp[] {
		return Object.keys(this._detectedVersions) as THostApp[];
	}

	public get activeUXPVersion(): string{
		const manualVersion = this._settings.version;
		const autoEnabled = this._settings.autoDetectVersion;
		if(!autoEnabled){
			return manualVersion;
		}
		const common = this.commonUXP;
		if(!common){
			return manualVersion;
		}
		return common.uxp;
	}

	/**
	 * Returns the latest(lowest common) version of UXP that is supported by all detected apps
	 */
	public get commonUXP(): ICommonUXP | null {
		const allExisting:ISafeAppVersion[] = [this.PS, this.ID, this.XD].filter(item => !!item) as ISafeAppVersion[];
		if (!allExisting.length) {
			return null;
		}
		const foundVersion = VersionMatcher.sortVersions(allExisting, "ascending")[0];
		const foundDate = VersionMatcher.sortDate(allExisting)[0];

		const v8Version: IV8Item | null = VersionMatcher.findV8Version(foundVersion.uxp);

		const res: ICommonUXP = {
			date: foundDate.date,
			uxp: foundVersion.uxp,
			v8: v8Version?.v8 ?? "unknown",
			es: v8Version?.es ?? "unknown",
		};

		return res;
	}

	public static findV8Version(uxpVersion: string): IV8Item | null {
		const versions: string[] = Object.keys(v8Versions);
		const range = `<=${uxpVersion}`;
		const safeAppVersion = maxSatisfying(versions, range);
		if (!safeAppVersion) {
			return null;
		}
		const found = v8Versions[safeAppVersion];
		found.uxp = safeAppVersion;
		return found;
	}

	public get detectedVersions(): TDetectedVersions {
		return this._detectedVersions;
	}

	public getSafeKnownVersion(hostApp: THostApp):ISafeAppVersion | null {
		if (!this._detectedVersions[hostApp]) {
			return null;
		}
		const versions: string[] = Object.keys(versionTable[hostApp]);
		const range = `<=${this._detectedVersions[hostApp]}`;
		const safeAppVersion = maxSatisfying(versions, range);
		if (!safeAppVersion) {
			return null;
		}

		const found = versionTable[hostApp][safeAppVersion];
		const v8Version: IV8Item | null = VersionMatcher.findV8Version(found.uxp);

		const res: ISafeAppVersion = {
			...found,
			safeAppVersion,
			v8: v8Version?.v8 ?? "unknown",
			es: v8Version?.es ?? "unknown",
		};
		return res;
	}

	public static sortVersions(versions: ISafeAppVersion[], order: "ascending" | "descending") {
		function sort(semvers: ISafeAppVersion[], compare: typeof TCompare) {
			return semvers.sort(function (v1, v2) {
				return compare(v1.uxp, v2.uxp);
			});
		}

		if (order === "ascending") {
			return sort(versions, compare);
		} else if (order === "descending") {
			return sort(versions, rcompare);
		} else {
			throw new Error("Sorting argument is wrong");
		}
	}

	public static sortDate(semvers: ISafeAppVersion[]) {
		return semvers.sort(function (v1, v2) {
			return v2.date.getTime() - v1.date.getTime();
		});
	}
}

export function dateToYMD(date?: Date) {
	if (!date) {
		return "";
	}
	const strArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	// var d = date.getDate();
	const m = strArray[date.getMonth()];
	const y = date.getFullYear();
	return m + " " + y;
}

class _VersionMatcherFromFile extends VersionMatcher {
	constructor(content: string|null, settings:ISettings) {
		try {
			if (content === null) {
				super({} as TDetectedVersions, settings);
				this._fileLoadOK = true;
				return;
			}
			const manifest = JSON.parse(content);

			const host: IHostApp[] | IHostApp = manifest?.host;

			// must be an array or object
			if ((Array.isArray(host) || typeof host === "object") === false) {
				throw new Error("Host property in manifest must be an array or object");
			}
			const hostArr: IHostApp[] = !Array.isArray(host) ? [host] : host;

			hostArr.forEach((h: IHostApp) => {
				h.minVersion = sanitizeVersionString(h.minVersion);
				if (!supportedApps.includes(h?.app)) {
					throw new Error("Unsupported app: " + h.app);
				}
			});


			// eslint-disable-next-line no-inner-declarations
			function getVersion(hostStr: THostApp): string | "" {
				return hostArr.find(h => h.app === hostStr)?.minVersion || "";
			}

			const detectedVersions: TDetectedVersions = {
				ID: getVersion("ID"),
				PS: getVersion("PS"),
				XD: getVersion("XD"),
				premierepro: getVersion("premierepro"),
			};

			super(detectedVersions, settings);
			this._fileLoadOK = true;
		} catch (error) {
			console.warn(error);
			super({} as TDetectedVersions, settings);
			//throw error;
			//return null;
		}
	}
}

export class VersionMatcherFromFile extends _VersionMatcherFromFile {
	constructor(content: string|null, settings:ISettings) {
		super(content, settings);
	}

	public get hasError(): boolean {
		return !this._fileLoadOK;
	}
}

/**
 * Adds patch version if applicable otherwise returns string as it is
 * @param version
 * @returns
 */
function addPatch(version: string): string {

	const len = Array.from(version.matchAll(/\./g)).length;

	if (len === 1) {
		return version + ".0";
	}
	return version;
}

/**
 * Throw an error if passed string is not valid version string
 * @param v
 */
function assertVersionString(v: string):void  {
	if (typeof v !== "string") {
		throw new Error("Version must be a string");
	}
	const len = Array.from(v.matchAll(/\./g)).length;
	if (len !== 2) {
		throw new Error("Version must be in format 'x.y.z' with two dots");
	}
	const reg = new RegExp(/^[0-9]+\.[0-9]+\.[0-9]+$/);
	if (!reg.test(v)) {
		throw new Error("Version string does match regex");
	}
}

function sanitizeVersionString(v: string): string{
	if (typeof v === "string") {
		v = addPatch(v);
	}
	assertVersionString(v);
	return v;
}

export function versionMatches(featureVersion: string[], configVersion: string): boolean {

	// TODO change this once we have more apps
	featureVersion = featureVersion.map((version) => version.replace("UXP", ""));
	configVersion = configVersion.replace("UXP", "");

	const res = featureVersion.some((version) => {
		const comp = lte(
			sanitizeVersionString(version),
			sanitizeVersionString(configVersion),
		);
		return comp;
	});
	return res;
}
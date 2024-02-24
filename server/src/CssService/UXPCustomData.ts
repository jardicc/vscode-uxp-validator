import {IAtDirectiveData, IPropertyData, IPseudoClassData, IValueData} from "../CssServiceOriginal/cssLanguageTypes";
import {versionMatches} from "../../../common/VersionMatcher";
import {IFunctionNamesData, IUnitsData, TAllData, TCategories, UXPCSSDataV1} from "./cssLanguageTypes";


export class UXPCustomData {

	private _cssData: UXPCSSDataV1;

	private _indexed: Record<TCategories, Record<string, number>> = {
		properties: {},
		atDirectives: {},
		pseudoClasses: {},
		pseudoElements: {},
		mediaFeatures: {},
		units: {},
		functionNames: {},
	};
	private _uxpVersion: string;

	constructor(cssData: UXPCSSDataV1, uxpVersion: string) {
		this._cssData = cssData;
		this._uxpVersion = uxpVersion;
	}

	public get versionForDisplay(): string {
		return `UXP ${this._uxpVersion}`;
	}

	public get version(): string {
		return this._uxpVersion;
	}

	public getProperty(name: string): IPropertyData | null {
		return this.getItem(name, "properties");
	}

	public getAtDirective(name: string) {
		return this.getItem(name, "atDirectives");
	}

	public getPseudoClass(name: string) {
		return this.getItem(name, "pseudoClasses");
	}

	public getPseudoElement(name: string) {
		return this.getItem(name, "pseudoElements");
	}

	public getMediaFeature(name: string) {
		return this.getItem(name, "mediaFeatures");
	}

	public getUnit(name: string) {
		return this.getItem(name, "units");
	}

	public getFunctionName(name: string) {
		return this.getItem(name, "functionNames");
	}

	// VALID

	public getValidProperty(name: string): UXPCustomDataValues | null {
		return this.getValidItem(name, "properties");
	}

	public getValidAtDirective(name: string): IAtDirectiveData | null {
		return this.getValidItem(name, "atDirectives");
	}

	public getValidPseudoClass(name: string): IPseudoClassData | null {
		return this.getValidItem(name, "pseudoClasses");
	}

	public getValidPseudoElement(name: string): IPseudoClassData | null {
		return this.getValidItem(name, "pseudoElements");
	}

	public getValidMediaFeature(name: string): IAtDirectiveData | null {
		return this.getValidItem(name, "mediaFeatures");
	}

	public getValidUnit(name: string): IUnitsData | null {
		return this.getValidItem(name, "units");
	}

	public getValidFunctionName(name: string): IFunctionNamesData | null {
		return this.getValidItem(name, "functionNames");
	}


	private getItem(name: string, category: TCategories): TAllData | null {
		const foundIndex = this._indexed[category][name];
		if (typeof foundIndex === "number") {
			return this._cssData[category][foundIndex];
		}

		const found = this._cssData[category].find((p, index) => {
			if (p.name === name) {
				this._indexed[category][name] = index;
				return true;
			}
			return false;
		});
		if (!found) {
			return null;
		}
		return found;
	}

	private getValidItem(name: string, category: "properties"): UXPCustomDataValues | null
	private getValidItem(name: string, category: TCategories): TAllData | null
	private getValidItem(name: string, category: TCategories): UXPCustomDataValues | TAllData | null {
		const item = this.getItem(name, category);
		if (!item) {
			return null;
		}
		if (!item.browsers) {
			throw new Error(`${category} ${name} has no versions defined`);
		}
		if (item.status === "obsolete" || !versionMatches(item.browsers, this._uxpVersion)) {
			return null;
		}
		if (category === "properties") {
			const res = new UXPCustomDataValues(this, item);
			return res;
		}
		return item;
	}
}


export class UXPCustomDataValues{
	private _parent: UXPCustomData;
	private _propertyData: IPropertyData;

	constructor(parent: UXPCustomData, propertyData:IPropertyData) {
		this._parent = parent;
		this._propertyData = propertyData;
	}

	public getValidValues():IValueData[]	 {
		const browsersMain = this._propertyData.browsers;
		if (!browsersMain) {
			throw new Error("Missing compatibility info for " + this._propertyData.name);
		}
		if (!versionMatches(browsersMain, this._parent.version)) {
			return [];
		}
		const values = this._propertyData.values;
		if (!values) {
			return [];
		}
		const filtered = values.filter(v => {
			if (!v.browsers) {
				// Inherit from property itself
				return true;
			}
			return versionMatches(v.browsers, this._parent.version);
		});
		return filtered;
	}

	public isValid(value:string):boolean {
		const validValues = this.getValidValues();
		if (!validValues.length) {
			return false;
		}
		return validValues.some(v => v.name === value);
	}
}
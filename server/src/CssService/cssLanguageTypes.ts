import {CSSDataV1, IAtDirectiveData, IPropertyData, IPseudoClassData, IPseudoElementData} from "../CssServiceOriginal/cssLanguageTypes";


export type TCategories = keyof UXPCSSDataV1;
export type TAllData = IPropertyData |
  IAtDirectiveData |
  IPseudoClassData |
  IPseudoElementData |
  IMediaFeaturesData |
  IUnitsData |
  IFunctionNamesData
export type IMediaFeaturesData = IAtDirectiveData;
export type IUnitsData = IAtDirectiveData;
export type IFunctionNamesData = IAtDirectiveData;

export interface UXPCSSDataV1 extends Omit<Required<CSSDataV1>, "version"> {
  mediaFeatures: IMediaFeaturesData[];
  units: IUnitsData[];
  functionNames: IFunctionNamesData[];

}



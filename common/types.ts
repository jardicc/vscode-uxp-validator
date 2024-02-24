export const supportedApps = [
	"XD",
	"PS",
	"ID",
] as const;

export type THostApp = typeof supportedApps[number];

export interface IHostApp{
	minVersion: string;
	app: THostApp
}

export type TDetectedVersions = Record<THostApp, string>


export interface IFirstSafeAppVersion extends ISafeAppVersion{
	app: THostApp
}

export interface ISafeAppVersion extends ICommonUXP{
	safeAppVersion: string
}

export interface ICommonUXP{
	date: Date
	uxp: string
	v8: string
	es: string
}

export interface IPickVersionArg{
	app: string
	version: string
	uxpVersion: string
}

export interface ISettings {
	autoDetectVersion: boolean,
	enabled: boolean,
	version: string
}
import {cssData as origCssData} from "./CssServiceOriginal/data/webCustomData";
import {cssData as uxpCssData} from "./CssService/data/uxpCustomData";
// import * as vscode from "vscode";

/*
export function generate() {
	const res:string[] = [];

	const origProps = uxpCssData.properties?.map((prop) => prop.name);

	origCssData.properties?.forEach((prop) => {
		if (origProps?.includes(prop.name)) {
			res.push(`${prop.name};${prop.restrictions} §;${prop.syntax} §`);
			prop.values?.forEach((value, valIndex) => {
				if (value.name.startsWith("-")) {
					return;
				}
				res.push(`;${value.name}`);
			});
			res.push("");
		}
	});
	vscode.env.clipboard.writeText(res.join("\n"));
}
*/

/**
 * This is to generate properties table to get compatibility overview
 */
export function generate() {
	const res:string[] = [];

	const origProps = uxpCssData.properties?.map((prop) => prop.name);

	origCssData.properties?.forEach((prop) => {
		if (origProps?.includes(prop.name)) {
			res.push(`${prop.name};${prop.syntax} §;§;§`);
			const processedRestrictions = (prop.restrictions ?? []).filter(restriction => restriction !== "enum").map(r => `;${r} €`);
			res.push(...processedRestrictions);
			prop.values?.forEach((value, valIndex) => {
				if (value.name.startsWith("-")) {
					return;
				}
				const found = uxpCssData.properties?.find((uxpProp) => uxpProp.name === prop.name);
				const foundValue = found?.values?.find((uxpValue) => uxpValue.name === value.name);

				const version = found?.browsers?.[0]?.replace("UXP", "");
				const versionValue = foundValue?.browsers?.[0]?.replace("UXP", "");
				let uxpVersion = "n/a";
				if (foundValue) {
					uxpVersion = versionValue ?? version ?? "n/a";
				}
				if (uxpVersion === "100.0") {
					uxpVersion = "?";
				}
				res.push(`;${value.name};${uxpVersion}`);
			});
			res.push("");
		}
	});
	/*
	vscode.env.clipboard.writeText(res.join("\n")).then(() => {
		console.log("done");
	});
	*/

}

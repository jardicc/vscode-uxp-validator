import {THostApp} from "./types";

export const versionTable:TVersionTable = {
	PS: {
		"26.0.0": {uxp: "8.0.1", date: new Date("Oct 2024")}, //
		"25.5.0": {uxp: "7.4.0", date: new Date("Feb 2024")}, //
		"25.2.0": {uxp: "7.3.0", date: new Date("Now 2023")}, // check the date
		"25.0.0": {uxp: "7.2.0", date: new Date("Sep 2023")},
		"24.6.0": {uxp: "7.1.0", date: new Date("Apr 2023")}, // June 2023 (version 24.6) release
		"24.4.0": {uxp: "7.0.0", date: new Date("Feb 2023")}, // April 2023 (version 24.4.1) release
		"24.3.0": {uxp: "6.5.2", date: new Date("Mar 2023")}, // March 2023 (version 24.3) release
		"24.2.0": {uxp: "6.5.1", date: new Date("Feb 2023")}, // February 2023 (version 24.2) release
		"24.1.0": {uxp: "6.4.0", date: new Date("Dec 2022")}, // Version 24.1 was released in December 2022.
		"24.0.0": {uxp: "6.3.3", date: new Date("Oct 2022")}, // Version 24.0 was released in October 2022.
		"23.5.0": {uxp: "6.2.0", date: new Date("Aug 2022")}, // Version 23.5 was released in August 2022.
		"23.4.0": {uxp: "6.1.1", date: new Date("Jun 2022")}, // Version 23.4 was released in June 2022.
		"23.3.0": {uxp: "6.0.1", date: new Date("Apr 2022")}, // Version 23.3 was released in April 2022.
		"23.2.0": {uxp: "5.6.0", date: new Date("Feb 2022")}, // Version 23.2 was released in February 2022.
		"23.0.0": {uxp: "5.5.1", date: new Date("Oct 2021")}, // Version 23.0 was released in October 2021.
		"22.5.0": {uxp: "5.4.1", date: new Date("Apr 2021")}, // Version 22.5 was released in August 2021.s
		"22.4.0": {uxp: "5.0.1", date: new Date("May 2021")}, // Version 22.4 was released in May 2021.
		"22.2.0": {uxp: "4.3.2", date: new Date("Feb 2021")}, // Version 22.2 was released in Feb 2021.
		"21.1.0": {uxp: "3.4.2", date: new Date("Feb 2020")}, // Version 21.1 was released in Feb 2020.

		/*
			Version 24.7 was released on July 27, 2023.
			May 2023 (version 24.5) release
			Version 22.0.0 was released in October 2020.
			Version 22.0.1 was released in November 2020.
			Version 22.1.0 was released in December 2020.
			Version 22.1.1 was released in January 2021.
			Version 22.2 was released in February 2021.
			Version 22.3 was released in March 2021. This is the first macOS release to run natively on Apple silicon.[69]
			Version 22.3.1 was released in April 2021.
		*/
	},
	ID: {
		"20.0.0": {uxp: "8.0.1", date: new Date("Oct 2024")},
		"19.0.0": {uxp: "7.3.1", date: new Date("Sep 2023")},
		"18.5.0": {uxp: "7.1.0", date: new Date("Jun 2023")},
	},
	XD: {
		"55.0.0": {uxp: "6.3.0", date: new Date("Aug 2022")},
		"54.0.0": {uxp: "6.2.1", date: new Date("May 2022")},
		"52.0.0": {uxp: "6.1.0", date: new Date("May 2022")},
		"49.0.0": {uxp: "5.6.2", date: new Date("Mar 2022")},
		"45.0.0": {uxp: "5.5.3", date: new Date("Oct 2021")},
		"44.0.0": {uxp: "5.4.1", date: new Date("Aug 2021")},
		"42.0.0": {uxp: "5.2.14", date: new Date("Jul 2021")},
		"41.0.0": {uxp: "5.1.1", date: new Date("Jun 2021")},
		"40.0.0": {uxp: "5.0.0", date: new Date("May 2021")},
		"38.0.32": {uxp: "4.4.1", date: new Date("Mar 2021")},
		"37.0.32": {uxp: "4.4.0", date: new Date("Feb 2021")},
		"36.0.32": {uxp: "4.3.2", date: new Date("Jan 2021")},
		"35.0.12": {uxp: "4.2.1", date: new Date("Dec 2020")},
		"30.0.0": {uxp: "3.5.0", date: new Date("May 2020")},
		"29.0.32": {uxp: "3.4.4", date: new Date("May 2020")},
		"28.0.0": {uxp: "3.3.9", date: new Date("Mar 2020")},
		"21.0.12": {uxp: "3.0.0", date: new Date("Jul 2019")},

	},

};

// See https://compat-table.github.io/compat-table/es2016plus/ for overview of ES features

export const v8Versions:IV8Versions = {
	"8.0.1": {
		v8: "12.2.0.0", // ! only best guess. I can't find the exact version anywhere. Could be higher.
		es: "2024",
		extraFeatures: [
			"ES2025 - Iterator Helpers", // works
		],
		missingFeatures: [
			"ES2025 - Duplicate named capturing groups",
			"ES2025 - Set methods",
			"ES2025 - RegExp Pattern Modifiers",
			// not about Unicode and Regexp
		],
	}, // Oct 27 2021
	"6.0.0": {
		v8: "9.4.146.24",
		es: "2022",
		missingFeatures: [
			"ES2018 - RegExp Unicode 15 Property Escapes",
			"ES2018 - RegExp Unicode 15.1 Property Escapes",
			"ES2022 - RegExp Match Indices (`hasIndices` / `d` flag) > shows up in flags",
		],
	}, // Oct 27 2021

	"5.1.0": {
		v8: "8.9.255.20",
		es: "2021",
		missingFeatures: [
			"ES2018 - RegExp Unicode 14 Property Escapes",
			"ES2018 - RegExp Unicode 15 Property Escapes",
			"ES2018 - RegExp Unicode 15.1 Property Escapes",
			"ES2020 - Spread parameters after optional chaining",
		],
	}, // Feb 25 2021

	"5.0.0": {
		v8: "8.8.278.14",
		es: "2021",
		missingFeatures: [
			"ES2018 - RegExp Unicode 14 Property Escapes",
			"ES2018 - RegExp Unicode 15 Property Escapes",
			"ES2018 - RegExp Unicode 15.1 Property Escapes",
			"ES2020 - Spread parameters after optional chaining",
		],
	}, // Jan 12 2021

	"4.3.0": {
		v8: "8.3.110.13",
		es: "2020",
		missingFeatures: [
			"ES2018 - RegExp Unicode 14 Property Escapes",
			"ES2018 - RegExp Unicode 15 Property Escapes",
			"ES2018 - RegExp Unicode 15.1 Property Escapes",
			"ES2020 - Spread parameters after optional chaining",
		],
	}, // May 21 2020
};

type TVersionTable = Record<THostApp, IVersionTable>

interface IVersionTable{
	[key:string]:IUxpItem
}

interface IUxpItem{
	uxp: string
	date: Date
}

export interface IV8Versions{
	[key: string]: IV8Item
}

export interface IV8Item{
	uxp?: string
	es: string
	v8: string
	missingFeatures?: string[]
	extraFeatures?: string[]
}

/*

# UXP General Information
- ECMAScript Version in UXP v6.4 : ECMA-262
- React Version Supported in UXP v6.4: React 16 or lower

## Applications Integrated with UXP

| Application   | UXP v7.1 | UXP v7.0 | UXP v6.5| UXP v6.4| UXP v6.3| UXP v6.2 | UXP v6.1 | UXP v6.0 | UXP v5.6 | UXP v5.5 |
| ------------- | -------- | -------- | ------- | ------- | ------- | -------- | -------- | -------- | -------- | -------- |
|Photoshop      | 24.6     | 24.4     | 24.1    | 24.1    | 24.0    | 23.5     | 23.4     | 23.3     | 23.2     | 23.0     |
|InDesign       | -        | -        | 18.1    | -       | 18.0    | 17.4	   | -        | -        | 17.1     | 17.0     |
|InDesign Server| -        | -        | -       | -       | 18.0    | 17.4	   | -        | -        | 17.1     | 17.0     |
|XD             | -        | -        | -       | -       | 55      | 54	   | -        | -        | 53       | 45       |

## UXP Features Supported in Applications
| Application   | UXP Plugins    | UXP Scripting |
| ------------- | -------------- | ------------- |
| Photoshop     | ✅	            | ✅ from 24.1  |
| InDesign      | -	             | ✅ from 18.0  |


APPLICATION	UXP V6.3	|	UXP V6.2	|	UXP V6.1	|	UXP V6.0	|	UXP V5.6	|	UXP V5.5
Photoshop				|	24.0		|	23.5		|	23.4		|	23.3		|	23.2		|	23.0
InDesign				|	18.0		|	17.4		|	-			|	-			|	17.1		|	17.0
InDesign Server			|	18.0		|	17.4		|	-			|	-			|	17.1		|	17.0
XD						|	55			|	54			|	-			|	-			|	53			|	45
InCopy					|	18.0		|	17.4		|	-			|	-			|	17.1		|	17.0
Illustrator				|	27.0		|	-			|	26.4		|	26.3		|	23.2		|	23.0
Premiere Pro			|	23.0		|	22.6		|	22.5		|				|	22.3		|	22.0
After Effects			|	23.0		|	22.6		|	22.5		|				|	22.3		|	22.0
Animate					|	-			|	23.0		|	-			|	-			|	-			|	22.0
Bridge					|	13.0		|	-			|	-			|	-			|	-			|	12.0
Rush					|				|				|				|				|				|
Aero					|				|				|				|				|				|

*/
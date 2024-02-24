/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";

import * as nodes from "../../CssServiceOriginal/parser/cssNodes";
import { LintSettings } from "../../CssServiceOriginal/cssLanguageTypes";

import * as l10n from "@vscode/l10n";

const Warning = nodes.Level.Warning;
const Error = nodes.Level.Error;
const Ignore = nodes.Level.Ignore;

export class Rule implements nodes.IRule {
	public constructor(
		public id: string,
		public message: string,
		public defaultValue: nodes.Level,
	) {
		// nothing to do
	}
}

export class Setting {
	public constructor(
		public id: string,
		public message: string,
		public defaultValue: any,
	) {
		// nothing to do
	}
}

export const Rules = {
	UnsupportedPseudoSelector: new Rule(
		"unsupportedPseudoSelector",
		l10n.t("This pseudo selector is not supported in UXP"),
		Error,
	),
	UnsupportedUnit: new Rule(
		"unsupportedUnit",
		l10n.t("This unit is not supported in UXP"),
		Error,
	),
	UnsupportedMediaFeature: new Rule(
		"unsupportedMediaFeature",
		l10n.t("This media feature is not supported in UXP"),
		Error,
	),
	UnsupportedFunction: new Rule(
		"unsupportedFunction",
		l10n.t("Function not supported in UXP"),
		Error,
	),
	UnknownProperty: new Rule(
		"invalidProperty",
		l10n.t("Invalid property."),
		Error,
	),
	UnsupportedValue: new Rule(
		"unsupportedValue",
		l10n.t("Unsupported Value."),
		Error,
	),
	UnknownAtRules: new Rule(
		"unknownAtRules",
		l10n.t("This at-rule not supported in UXP"),
		Error,
	),
};

export const Settings = {
	ValidProperties: new Setting(
		"validProperties",
		l10n.t(
			"A list of properties that are not validated against the `unknownProperties` rule.",
		),
		[],
	),
};

export class LintConfigurationSettings {
	constructor(private conf: LintSettings = {}) {}

	getRule(rule: Rule): nodes.Level {
		if (Object.hasOwnProperty.call(this.conf, rule.id)) {
			const level = toLevel(this.conf[rule.id]);
			if (level) {
				return level;
			}
		}
		return rule.defaultValue;
	}

	getSetting(setting: Setting): any {
		return this.conf[setting.id];
	}
}

function toLevel(level: string): nodes.Level | null {
	switch (level) {
		case "ignore":
			return nodes.Level.Ignore;
		case "warning":
			return nodes.Level.Warning;
		case "error":
			return nodes.Level.Error;
	}
	return null;
}

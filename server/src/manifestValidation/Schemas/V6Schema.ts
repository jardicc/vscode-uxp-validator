import {cloneDeep} from "lodash";
import {JSONSchema} from "../JsonService/jsonSchema";
import {V5Schema} from "./V5Schema";

const V6Schema: JSONSchema = cloneDeep(V5Schema);

V6Schema.definitions!.addonObject = {
	"properties": {
		"name": {
			"type": "string",
			"minLength": 1,
			"maxLength": 40,
			"pattern": "^.*(\\.uxpaddon)$",
			"markdownDescription": "The name of the addon file. File name without the file path. It must end with `.uxpaddon`.",
		},
	},
	"required": [
		"name",
	],
	"type": "object",
	"unevaluatedProperties": false,
};

V6Schema.properties!.addon = {
	"type": "object",
	"$ref": "#/definitions/addonObject",
	"markdownDescription": "Addon definitions for hybrid plugins. A UXP Hybrid plugin is a UXP plugin that can access the power of C++ native libraries.\n\n*Not supported in InDesign v18.5*",
};

(V6Schema.properties!.requiredPermissions as any).properties.enableAddon = {
	"const": true,
	"default": true,
	"markdownDescription": "Enables C++ native addons for hybrid plugins. Do not set this to `false`.",
};

V6Schema.dependentSchemas = {
	// require permission when addon is specified
	"addon": {
		"properties": {
			"requiredPermissions": {
				"type": "object",
				"properties": {
					"enableAddon": {
						"type": "boolean",
						"const": true,
					},
				},
				"required": ["enableAddon"],
			},
		},
		"required": ["requiredPermissions"],
	},
};

V6Schema.allOf = [
	// conditions
	// require "addon" property if permission is used
	{
		"if": {
			"properties": {
				"requiredPermissions": {
					"properties": {
						"enableAddon": {
							"const": true,
						},
					},
					// do not require "addon" object if permission is missing entirely
					"required": ["enableAddon"],
				},
			},
			"required": ["requiredPermissions"],
		},
		"then": {
			"required": ["addon"],
		},
	},
];

export {V6Schema};
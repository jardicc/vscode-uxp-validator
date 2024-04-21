import {JSONSchema} from "../JsonService/jsonSchema";

export const manifestVersionProperty = (override:JSONSchema={}):JSONSchema => ({
	"default": 5,
	"enum": [
		6,
		5,
		4,
	],
	"markdownEnumDescriptions": [
		"Supports hybrid plugins.",
		"Recommended in 2024. Introduces `requiredPermissions`",
		"# ⚠️ Deprecated. \n ## Do not use for new projects!",
	],
	"type": "integer",
	"markdownDescription": "The version of the manifest. (This file). Different versions allows different properties and values.",
	...override,
});
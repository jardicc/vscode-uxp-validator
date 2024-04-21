import {JSONSchema} from "../JsonService/jsonSchema";
import {manifestVersionProperty} from "./manifestVersionProperty";

export const unsupportedSchema: JSONSchema = {
	"$schema": "http://json-schema.org/draft-04/schema#",
	"properties": {
		"manifestVersion": manifestVersionProperty({
			"markdownDescription": "## ⚠️ Your manifest version is unknown.\n If `manifestVersion` is missing then version is `3`.",
		}),
	},
	"required": [
		"manifestVersion",
	],
	"type": "object",
};

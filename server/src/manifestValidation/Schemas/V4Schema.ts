import {manifestVersionProperty} from "./manifestVersionProperty";

export const v4Schema = {
	"definitions": {
		"size": {
			"type": "object",
			"properties": {
				"width": {
					"type": "integer",
				},
				"height": {
					"type": "integer",
				},
			},
			"unevaluatedProperties": false,
		},
		"iconsObject": {
			"properties": {
				"width": {
					"type": "integer",
				},
				"height": {
					"type": "integer",
				},
				"path": {
					"type": "string",
					"pattern": ".*\\.(svg|SVG|png|PNG|jpg|JPG|jpeg|JPEG)$",
				},
				"theme": {
					"type": "array",
					"items": {
						"type": "string",
						"enum": [
							"lightest",
							"light",
							"medium",
							"dark",
							"darkest",
							"all",
						],
					},
				},
				"species": {
					"type": "array",
					"items": {
						"type": "string",
						"enum": [
							"chrome",
							"toolbar",
							"import",
							"export",
							"pluginList",
							"generic",
						],
					},
				},
				"scale": {
					"type": "array",
					"items": {
						"type": "number",
					},
				},
			},
			"required": [
				"path",
			],
			"type": "object",
			"anyOf": [
				{
					"properties": {
						"path": {
							"pattern": ".*\\.(svg|SVG)$",
						},
					},
				},
				{
					"required": [
						"width",
						"height",
					],
				},
			],
			"unevaluatedProperties": false,
		},
		"commandEP": {
			"properties": {
				"type": {
					"enum": [
						"command",
					],
				},
				"id": {
					"type": "string",
					"minLength": 1,
				},
				"label": {
					"oneOf": [
						{
							"type": "string",
						},
						{
							"type": "object",
						},
					],
				},
				"shortcut": {
					"type": "object",
					"properties": {
						"mac": {
							"type": "string",
						},
						"win": {
							"type": "string",
						},
					},
				},
				"description": {
					"oneOf": [
						{
							"type": "string",
						},
						{
							"type": "object",
						},
					],
				},
			},
			"required": [
				"id",
				"type",
			],
			"type": "object",
			"unevaluatedProperties": false,
		},
		"panelEP": {
			"properties": {
				"type": {
					"enum": [
						"panel",
					],
				},
				"id": {
					"type": "string",
					"minLength": 1,
				},
				"label": {
					"oneOf": [
						{
							"type": "string",
						},
						{
							"type": "object",
						},
					],
				},
				"shortcut": {
					"type": "object",
					"properties": {
						"mac": {
							"type": "string",
						},
						"win": {
							"type": "string",
						},
					},
				},
				"description": {
					"oneOf": [
						{
							"type": "string",
						},
						{
							"type": "object",
						},
					],
				},
				"minimumSize": {
					"$ref": "#/definitions/size",
				},
				"maximumSize": {
					"$ref": "#/definitions/size",
				},
				"preferredDockedSize": {
					"$ref": "#/definitions/size",
				},
				"preferredFloatingSize": {
					"$ref": "#/definitions/size",
				},
				"panelEvents": {
					"type": "object",
				},
			},
			"required": [
				"id",
				"type",
			],
			"type": "object",
			"unevaluatedProperties": false,
		},
		"EP": {
			"type": "array",
			"items": {
				"oneOf": [
					{
						"$ref": "#/definitions/commandEP",
					},
					{
						"$ref": "#/definitions/panelEP",
					},
				],
			},
		},
		"hostObject": {
			"properties": {
				"app": {
					"type": "string",
				},
				"minVersion": {
					"type": "string",
					"minLength": 1,
				},
				"maxVersion": {
					"type": "string",
					"minLength": 1,
				},
				"main": {
					"type": "string",
					"minLength": 1,
				},
				"pluginLevel": {
					"type": "string",
					"minLength": 1,
				},
				"icons": {
					"type": "array",
					"items": {
						"$ref": "#/definitions/iconsObject",
					},
				},
				"dependecies": {
					"type": "object",
				},
				"backgroundEvents": {
					"type": "object",
				},
				"panelEvents": {
					"type": "object",
				},
				"entryPoints": {
					"$ref": "#/definitions/EP",
				},
				"entrypoints": {
					"$ref": "#/definitions/EP",
				},
			},
			"required": [
				"app",
				"minVersion",
			],
			"type": "object",
			"unevaluatedProperties": false,
		},
	},
	"properties": {
		"id": {
			"type": "string",
			"minLength": 1,
		},
		"strings": {
			"oneOf": [
				{
					"type": "string",
				},
				{
					"type": "object",
				},
			],
		},
		"name": {
			"oneOf": [
				{
					"type": "string",
				},
				{
					"type": "object",
				},
			],
		},
		"main": {
			"type": "string",
			"minLength": 1,
		},
		"entitlements": {
			"type": "array",
			"items": {
				"type": "string",
			},
		},
		"title": {
			"oneOf": [
				{
					"type": "string",
				},
				{
					"type": "object",
				},
			],
		},
		"dependecies": {
			"type": "object",
		},
		"icons": {
			"type": "array",
			"items": {
				"$ref": "#/definitions/iconsObject",
			},
		},
		"host": {
			"oneOf": [
				{
					"$ref": "#/definitions/hostObject",
				},
			],
		},
		"hosts": {
			"oneOf": [
				{
					"$ref": "#/definitions/hostObject",
				},
			],
		},
		"requiredPermissions": {
			"oneOf": [
				{
					"type": "object",
				},
				{
					"type": "string",
				},
				{
					"type": "boolean",
				},
			],
		},
		"manifestVersion": manifestVersionProperty(),
		"version": {
			"type": "string",
			"minLength": 1,
		},
		"entryPoints": {
			"$ref": "#/definitions/EP",
		},
		"entrypoints": {
			"$ref": "#/definitions/EP",
		},
		"backgroundEvents": {
			"type": "object",
		},
		"panelEvents": {
			"type": "object",
		},
		"customData": {
			"type": "object",
			"markdownDescription": "Unofficial custom data property guaranteed to be ignored by UXP Validator plugin. Use it for your own purposes.",
		},
	},
	"required": [
		"id",
		"version",
		"name",
	],
	"oneOf": [
		{
			"required": [
				"entryPoints",
			],
		},
		{
			"required": [
				"entrypoints",
			],
		},
	],
	"type": "object",
	"unevaluatedProperties": false,
};

import {JSONSchema} from "../JsonService/jsonSchema";
import {V5PhotoshopData} from "./V5Photoshop";
import {manifestVersionProperty} from "./manifestVersionProperty";

export const V5Schema: JSONSchema = {
	"$schema": "http://json-schema.org/draft-04/schema#",
	"definitions": {
		"localization": {
			"oneOf": [
				{
					"type": "string",
				},
				{
					"type": "object",
					"properties": {
						"default": {
							"type": "string",
						},
					},
					required: ["default"],
					patternProperties: {
						"^[a-zA-Z]{2}$": {
							"type": "string",
						},
					},
					"unevaluatedProperties": false,
				},
			],
		},
		"size": {
			"type": "object",
			"properties": {
				"width": {
					"type": "integer",
					"markdownDescription": "The width of the element in pixels.",
				},
				"height": {
					"type": "integer",
					"markdownDescription": "The height of the element in pixels.",
				},
			},
			"unevaluatedProperties": false,
		},
		"iconsObject": {
			"properties": {
				"width": {
					"type": "integer",
					"markdownDescription": "The width of the icon in pixels.",
					"enum": [
						23,
						24,
					],
					"markdownEnumDescriptions": [
						"Size for the panel icon in PS and InDesign",
						"All other places e.g. Plugin Manager",
					],
				},
				"height": {
					"type": "integer",
					"markdownDescription": "The height of the icon in pixels.",
					"enum": [
						23,
						24,
					],
					"markdownEnumDescriptions": [
						"Size for the panel icon in PS and InDesign",
						"All other places e.g. Plugin Manager",
					],
				},
				"path": {
					"type": "string",
					// "pattern": ".*\\.(svg|SVG|png|PNG|jpg|JPG|jpeg|JPEG)$",
					"pattern": "^[a-zA-Z0-9/!#$%&'()\\+,\\-\\.;=_\\[\\] ]+\\.(svg|SVG|png|PNG|jpg|JPG|jpeg|JPEG)$",
					// "pattern": "^(?![<>:\"\\|@?*\u0000-\u001F])+\.(svg|SVG|png|PNG|jpg|JPG|jpeg|JPEG)$",
					"markdownDescription": "Path to the icon (relative to the plugin root). Do not use `@` in filename same as do not use `@1x` or `@2x` postfix in manifest. But do use this in file names for the icon files located in your harddisk",
				},
				"theme": {
					"type": "array",
					"uniqueItems": true,
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
					"markdownDescription": "Array of themes this icon supports. Photoshop supports `lightest`, `light`, `dark`, and `darkest`. If all themes are compatible with the icon, you can use `all`. (Default is `all`).",
					"default": ["all"],
				},
				"species": {
					"type": "array",
					"uniqueItems": true,
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
						"markdownEnumDescriptions": [
							"n/a",
							"suitable for display in a toolbar. Icon sizes are 23x23px for 100% scaling and 46x46px for 200% scaling.",
							"suitable for rendering in an export dialog",
							"suitable for rendering in an import dialog",
							"suitable for display in a plugin list. Icon sizes are 24x24px for 100% scaling and 48x48px for 200% scaling.",
							"suitable for display anywhere",
						],
					},
					"markdownDescription": "Identifies the type of icon and where it would make sense to display it. The default is `generic`, meaning that Photoshop is free to use this icon anywhere.",
				},
				"scale": {
					"type": "array",
					"items": {
						"type": "integer",
						"enum": [
							1,
							2,
						],
					},
					"uniqueItems": true,
					"markdownDescription": "Array of scales provided. For example, `[1, 2]` means that there is a `@1x` and `@2x` version of the icon specified at the path. (Densities other than `1x` can be specified by adding `@2x` before the icon's extension)",
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
							// "pattern": ".*\\.(svg|SVG|png|PNG|jpg|JPG|jpeg|JPEG)$",
							"pattern": "^[a-zA-Z0-9/]+\\.(svg|SVG|png|PNG|jpg|JPG|jpeg|JPEG)$",
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
		"hostUIContextObject": {
			"properties": {
				"hideFromMenu": {
					"markdownDescription": "If `true`, the entry point is hidden from the Plugins menu (or its submenus).",
					"type": "boolean",
				},
				"hideFromPluginsPanel": {
					"markdownDescription": "If `true`, the entry point is removed from the Plugins Panel",
					"type": "boolean",
				},
				"initialLocation": {
					"markdownDescription": "Plugin panels are grouped together (based upon plugin id) by default. If the host application supports it, the developer can specify a new group ID to group subsets of panels together (or even group panels of other plugins together). UXP reserves only one location: `hidden`, which means that the panel is not intended to be visible initially.",
					"type": "string",
					"default": "hidden",
					// "docked right"
				},
				"triggerEvents": {
					"markdownDescription": "Specifies if the entry point should be triggered by host-determined events. The events themselves are host-specific.",
					"type": "array",
					"items": {
						"type": "string",
					},
					// [ "randomHostEvent1", "__adobe__.capture.show" ]
				},
			},
			"type": "object",
			"unevaluatedProperties": false,
		},
		"commandEP": {
			"properties": {
				"type": {
					"const": "command",
				},
				"id": {
					"type": "string",
					"minLength": 1,
					"markdownDescription": "The ID of the entrypoint. This ID must be unique within the plugin. It is used to identify the code that implements the entrypoint.",
				},
				"label": {
					"$ref": "#/definitions/localization",
					"markdownDescription": "The label of the entrypoint. This label is used to display the entrypoint to the user, such as in the plugin menu.",
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
					"markdownDescription": "A keyboard shortcut that can be used to invoke the entrypoint. Keyboard shortcuts are specified separately for Windows and macOS platforms. If the shortcut is not available in the host application, it will be ignored. **Currently, keyboard shortcuts are supported in Adobe XD only.**",
					"unevaluatedProperties": false,
				},
				"description": {
					"$ref": "#/definitions/localization",
					"markdownDescription": "A description of the entrypoint. This description is used in tooltips and other places where a longer description is appropriate, depending on the host app. Default value `undefined` (use plugin name)",
				},
				"hostUIContext": {
					"$ref": "#/definitions/hostUIContextObject",
				},
			},
			"required": [
				"id",
				"type",
			],
			"type": "object",
			"unevaluatedProperties": false,
		},
		"viewEP": {
			"properties": {
				"type": {
					"enum": [
						"panel",
						"view",
						"dockablePanel",
						"floatingPanel",
						"dialog",
						"modalDialog",
						"popover",
						"takeover",
					],
				},
				"id": {
					"type": "string",
					"minLength": 1,
					"markdownDescription": "The ID of the entrypoint. This ID must be unique within the plugin. It is used to identify the code that implements the entrypoint.",
				},
				"label": {
					"$ref": "#/definitions/localization",
					"markdownDescription": "The label of the entrypoint. This label is used to display the entrypoint to the user, such as in the plugin menu.",
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
					"markdownDescription": "A keyboard shortcut that can be used to invoke the entrypoint. Keyboard shortcuts are specified separately for Windows and macOS platforms. If the shortcut is not available in the host application, it will be ignored. **Currently, keyboard shortcuts are supported in Adobe XD only.**",
					"unevaluatedProperties": false,
				},
				"description": {
					"$ref": "#/definitions/localization",
					"markdownDescription": "A description of the entrypoint. This description is used in tooltips and other places where a longer description is appropriate, depending on the host app. Default value `undefined` (use plugin name)",
				},
				"icons": {
					"type": "array",
					"items": {
						"$ref": "#/definitions/iconsObject",
					},
					"markdownDescription": "An icon specific to the entrypoint. If specified, this icon overrides the plugin icon in places where the entrypoint is specifically displayed.",
				},
				"minimumSize": {
					"$ref": "#/definitions/size",
					"markdownDescription": "Indicates the desired minimum size of the view. The host may not be able to guarantee the minimum size. The size is defined by width and height in pixels. If no minimum size is specified, the host will use its own default minimum size.",
				},
				"maximumSize": {
					"$ref": "#/definitions/size",
					"markdownDescription": "The maximum desired size of the view. The host may not be able to guarantee the maximum size. If the view is hosted in a dialog, resizing can be prevented by setting `minimumSize = maximumSize.`",
				},
				"preferredDockedSize": {
					"$ref": "#/definitions/size",
					"markdownDescription": "The preferred size of the view when docked, if it can be docked, or for modal dialogs that have no reference_node_id. The host may not be able to guarantee this size.",
				},
				"preferredFloatingSize": {
					"$ref": "#/definitions/size",
					"markdownDescription": "The preferred size of the panel when floating. The host may not be able to guarantee this size. See minimumSize for the format.",
				},
				"hostUIContext": {
					"$ref": "#/definitions/hostUIContextObject",
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
						"$ref": "#/definitions/viewEP",
					},
				],
			},
			"markdownDescription": "This tells to application how and where load the plugin. E.g. what menu items to add or what panels to create. \n\nPlease use `entryPoints` instead of `entrypoints`",
		},
		"hostObject": {
			"properties": {
				"app": {
					// "type": "string",
					"enum": [
						"XD",
						"PS",
						"ID",
					],
					"markdownEnumDescriptions": [
						"Adobe XD",
						"Adobe Photoshop",
						"Adobe InDesign",
					],
					"markdownDescription": "Indicates the supported application for this plugin (currently, the only valid values here are `ID`, `XD` and `PS`).",
				},
				"minVersion": {
					"type": "string",
					"pattern": "^[0-9]+\\.[0-9]+(\\.[0-9]+)?$",
					"minLength": 3,
					"markdownDescription": "Minimum required version of the host app (in `x.y` format) that can run this plugin. The lowest valid version for manifest V4 plugins is version `22.0`. Note: The version number must be at least two segments. Typically, you'll leave the minor segment set to `0`, e.g. `22.0`.",
				},
				"maxVersion": {
					"type": "string",
					"pattern": "^[0-9]+\\.[0-9]+(\\.[0-9]+)?$",
					"minLength": 3,
					"markdownDescription": "Maximum version of host app (in `x.y` format) that can run this plugin.",
				},
				"main": {
					"type": "string",
					"minLength": 1,
					"markdownDescription": `Path to the your plugin initialization code. This can be a JavaScript file or an HTML file.`,
					"default": "main.js",
				},
				"pluginLevel": {
					"enum": [
						"application",
						"document",
					],
					"doNotSuggest": true,
				},
				"icons": {
					"type": "array",
					"items": {
						"$ref": "#/definitions/iconsObject",
					},
				},
				"dependecies": {
					"type": "object",
					"doNotSuggest": true,
				},
				"entryPoints": {
					"$ref": "#/definitions/EP",
				},
				"entrypoints": {
					"$ref": "#/definitions/EP",
					"doNotSuggest": true,
				},
			},
			"required": [
				"app",
				"minVersion",
			],
			"type": "object",
			"unevaluatedProperties": false,
			// Only Photoshop has data property
			"allOf": [
				{
					"if": {
						"properties": {
							"app": {
								"const": "PS",
							},
						},
					},
					"then": {
						"properties": {
							"data": V5PhotoshopData,
						},
					},
				},
			],
		},
	},
	"properties": {
		"analytics": {
			"properties": {
				"pluginSource": {
					"enum": [
						"3P.PRIVILEGED",
						"3P",
						"1P.PRIVATE",
						"1P",
						"1P.SHARED",
						"1P.BUNDLED",
					],
				},
			},
			"type": "object",
			"markdownDescription": `Property used by Adobe. Not for 3rd party.`,
			"doNotSuggest": true,
			"unevaluatedProperties": false,
		},
		"id": {
			"type": "string",
			"minLength": 1,
			"markdownDescription": "Unique identifier for your plugin. You can get your unique ID on the Adobe Developer Console",
			// "description": "Unique identifier for your plugin. You can get your unique ID on the Adobe Developer Console",
		},
		"featureFlags": {
			"type": "object",
			"properties": {
				"enableSWCSupport": {
					"type": "boolean",
					"default": true,
					"markdownDescription": "Enable Spectrum Web Component and few other features. E.g. better bug reporting on rejected promise, CSS box-shadow and rotate in transformation. Supported since UXP 7.0",
				},
				"enableMutationObserver": {
					"type": "boolean",
					"default": true,
					"markdownDescription": "Enable MutationObserver for browser-like DOM changes. `enableSWCSupport` already includes this flag. Supported since UXP 5.1",
				},
				"enableAlerts": {
					"type": "boolean",
					"default": true,
					"markdownDescription": "Flag required since UXP 7.4.0. InDesign support since UXP 7.3.0. Photoshop support since UXP 7.0.0.",
				},
				"enableFillAsCustomAttribute": {
					"type": "boolean",
					"default": true,
					"markdownDescription": "Added in UXP 7.1.0 - SVGElement: The color of the fill attribute using a CSS variable will resolve as per the variable value. For now, please test this fix by enabling the feature flag in your plugin manifest. This flag will be turned on by default in the next UXP release. \n\n Turned on by default in `UXP 8.0.1`",
				},
				"CSSNextSupport": {

					"oneOf": [
						{
							"type": "boolean",
							"default": true,
						},
						{
							"type": "array",
							"default": ["boxShadow", "transformFunctions", "transformProperties"],
							"items": {
								"type": "string",
								"enum": [
									"boxShadow",
									"transformFunctions",
									"transformProperties",
								],
							},
						},
					],
					"markdownDescription": "Enables new CSS features. \n\n Supported since UXP 8.0.1 \n\n If `enableSWCSupport` is `true`, then this flag is enabled by default.",
				},
			},
			"markdownDescription": "A set of feature flags that can be used to enable or disable certain features of the plugin. These flags are used to gate features that are not yet ready for general availability.",
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
			"markdownDescription": "A set of strings used to localize the plugin name and other user-facing strings. It can also be a path to a JSON file containing the StringsDefinition object.",
		},
		"name": {
			"oneOf": [
				{
					"type": "string",
					"minLength": 3,
					"maxLength": 45,
				},
				{
					"type": "object",
				},
			],
			"markdownDescription": "The name visually identifies the plugin in the user interface. It is usually used in a plugin menu listing or launcher for top-level action items. The name should be 3 - 45 characters. We recommend your plugin name matches the project name you created when getting your plugin ID from the Adobe Developer Console.",

		},
		"main": {
			"type": "string",
			"minLength": 1,
			"markdownDescription": `Path to the your plugin initialization code. This can be a JavaScript file or an HTML file.`,
			"default": "main.js",
		},
		"entitlements": {
			"type": "array",
			"items": {
				"type": "string",
			},
			"doNotSuggest": true,
			"markdownDescription": `Flags used by Adobe. Not for 3rd party.`,
			// "adobe-privileged"
		},
		"title": {
			"$ref": "#/definitions/localization",
			"doNotSuggest": true,
			"markdownDescription": `Indicates the title for the view (in those hosts that support this concept). If not provided, the plugin's name is used.`,
		},
		"dependecies": {
			"type": "object",
			"doNotSuggest": true,
			"markdownDescription": `Property used by Adobe. Not for 3rd party.`,
		},
		"icons": {
			"type": "array",
			"items": {
				"$ref": "#/definitions/iconsObject",
			},
			"markdownDescription": "Icons for your plugin (which may be rendered in various contexts, such as the plugin panel)\n\nPNG, JPG/JPEG formats are supported and the max file size for each icon is 1MB.\n\nYou should specify at least the 1x and 2x size. Icons for the Plugin Manager are uploaded directly via the Adobe Developer Console, not included within your plugin itself.",
		},
		"host": {
			"oneOf": [
				{
					"$ref": "#/definitions/hostObject",
				},
			],
			"markdownDescription": "This tells where and how should plugin load.",
		},
		"hosts": {
			"oneOf": [
				{
					"$ref": "#/definitions/hostObject",
				},
			],
			"markdownDescription": "This tells where and how should plugin load.",
		},
		"requiredPermissions": {
			"properties": {
				"clipboard": {
					"enum": [
						"read",
						"readAndWrite",
					],
					"markdownEnumDescriptions": [
						"Enables the plugin to read from the clipboard. \n\n API: `document.clipboard.getContent`",
						"Enables the plugin to read from and write to the clipboard. \n\n API: `document.clipboard.setContent`",
					],
					"markdownDescription": "To grant read and/or write access to the system clipboard. \n\n API: `document.clipboard`",
				},
				"network": {
					"properties": {
						"domains": {
							"oneOf": [
								{
									"type": "array",
									"items": {
										"type": "string",
									},
								},
								{
									"const": "all",
								},
							],
							"markdownDescription": "This will allow connection to any domain. Required for e.g.:\n\n- `XMLHttpRequest`\n- `fetch`\n- `WebSocket`\n- `<img url='...'/>`\n",
						},
					},
					"type": "object",
					"markdownDescription": "In order for our plugin to use the network, you must define domains that your plugin will access.",
					"unevaluatedProperties": false,
				},
				"webview": {
					"required": [
						"domains","allow",
					],
					"properties": {
						"domains": {
							"oneOf": [
								{
									"type": "array",
									"items": {
										"type": "string",
									},
								},
								{
									"const": "all",
								},
							],
							"markdownDescription": "If webview is specified, this indicates the domains the webview can render.",
						},
						"allow": {
							"const": "yes",
							"markdownDescription": "Enables webview access to the plugin.",
						},
						"allowLocalRendering": {
							"const": "yes",
							"markdownDescription": "If webview is specified, this indicates that the webview can render local content. \n\n Supported since UXP 8.0.1",
						},
						"enableMessageBridge": {
							"enum": [
								"localAndRemote",
								"localOnly",
								"no",
							],
							"markdownEnumDescriptions": [
								"Enables WebView & the content loaded on WebView to communicate via postMessage regardless of where the content is loaded from locally or remotely.",
								"Enables WebView & the content loaded on WebView to communicate via postMessage only if the content on WebView is loaded locally \n\n Supported since UXP 8.0.1",
								"Not allow WebView & the content loaded on WebView to communicate via postMessage",
							],
							"markdownDescription": "Enables WebView & the content loaded on WebView to communicate via postMessage. \n\n API: `HTMLWebViewElement.postMessage` and `window.uxpHost.postMessage`",
						},
					},
					"type": "object",
					"markdownDescription": "Enables the plugin to use webviews in its UI to display web content or complex UI. WebViews are available with UXP 6.0, and need to be configured in your plugin's manifest (v5 required).  \n\n API: `<webview>` tag in HTML",
					"unevaluatedProperties": false,
				},
				"localFileSystem": {
					"enum": [
						"plugin",
						"request",
						"fullAccess",
					],
					"markdownEnumDescriptions": [
						"Allows the plugin to access the plugin's storage only. \n\nAPI: `require('uxp').storage.localFileSystem`",
						"Allows the plugin to access the local file system using pickers for opening and saving files. \n\nAPI: `require('uxp').storage.localFileSystem`",
						"Allows the plugin to inspect, modify, and delete files to which you have access on all volumes attached to this device. The user will be required to consent before installation or update.  \n\nAPI: `file://` protocol in file paths",
					],
					"markdownDescription": "The localFileSystem permission controls access to the user's local file system. If not specified, the plugin has no access to the user's file system other than the default access to `plugin://`, `plugin-temp://`, and `plugin-data://`.",
				},
				"launchProcess": {
					"properties": {
						"schemes": {
							"type": "array",
							"items": {
								"type": "string",
								"pattern": "^[0-9a-zA-Z]+$",
							},
							"markdownDescription": "Allows the plugin to request permission to launch a process with the specified URI scheme (Consent not required at install time, but at run time). \n\nAPI: \n```javascript\nrequire('uxp').shell.launchApplication\nrequire('uxp').shell.openFile\n```",
						},
						"extensions": {
							"type": "array",
							"items": {
								"type": "string",
								// "pattern": "^\.?[0-9a-zA-Z]+$|^$" // dot is optional, can be mepty string (folder)
							},
							"markdownDescription": "A set of extensions that the plugin can launch. Only relevant for local files (using the file:// schema) E.g. `\".pdf\"` or empty string `\"\"` for a folders",
						},
					},
					"markdownDescription": "The `launchProcess` permission in the manifest controls the ability to launch applications and open files in other applications. With manifest v5, the `launchProcess` permission must be declared to use `openExternal` or `openPath`.",
					"unevaluatedProperties": false,
				},
				"ipc": {
					"properties": {
						"enableHostCommunication": {
							"type": "boolean",
							"markdownDescription": "If specified, allows the plugin to communicate with installed filters, automation plugins, etc.",
						},
						"enablePluginCommunication": {
							"type": "boolean",
							"markdownDescription": "If enabled, the plugin can communicate with other installed plugins.",
						},
					},
					"markdownDescription": "Enables the plugin to communicate with other plugins.",
					"unevaluatedProperties": false,
				},
				"allowCodeGenerationFromStrings": {
					"type": "boolean",
					"markdownDescription": "Allows you to declare inline event handlers in HTML elements and enables arbitrary code execution with strings. \n\n API: \n - `eval`\n - `new Function(string)`\n - Sourcemaps using 'eval'\n - Inline event handlers",
				},
				"fonts": {
					"markdownDescription": "Allows the plugin to access the fonts installed on the system.",
					"const": "readInstalled",
				},
				"enableUserInfo": {
					"type": "boolean",
					"default": true,
					"markdownDescription": "Required permission field to enable access to UserInfo API\n\nUXP: 7.3+",
				},
			},
			"type": "object",
			"markdownDescription": "Plugins using Manifest v5 will enjoy the enhancements in security with the introduction of new permissions model. Users will be asked for their consent when your plugin attempts to use openExternal, openPath, and sp-link/anchor tags. For everything else, consent is given at install time. Starting with v5, any permissions not explicitly declared in the manifest are not granted by default.",
			"unevaluatedProperties": false,
		},
		"manifestVersion": manifestVersionProperty(),
		"version": {
			"type": "string",
			"minLength": 5,
			"maxLength": 8,
			"pattern": "^[0-9]{1,2}\\.[0-9]{1,2}\\.[0-9]{1,2}$",
			"markdownDescription": "Version number of your plugin in `x.y.z` format. Version must be three segments and each version component must be between `0` and `99`.",
		},
		"entryPoints": {
			"$ref": "#/definitions/EP",
		},
		"entrypoints": {
			"$ref": "#/definitions/EP",
			"doNotSuggest": true,
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
		"host",
	],
	"anyOf": [
		{
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
		},
		{
			"required": [
				"main",
			],
		},
	],
	"type": "object",
	"unevaluatedProperties": false,
};

/*
PS 24.2
- "addon": "name": "sample-uxp-addon.uxpaddon"
- "requiredPermissions": "enableAddon" : true




Behavior before UXP-6.0:
3P plugin should declare the 'launchProcess' permission on its manifest to use openExternal API. e.g.,
    "permissions": {
        "launchProcess": "request" | "any"
    }
*/


/*
7.1
This feature is currently behind a feature flag called "enableFillAsCustomAttribute" which will be disabled by default.
This will give component teams the time to make changes on their side to honour the newly working "fill" attribute.

This feature flag can be added in manifest.json file of the plugin as below:-

"featureFlags":{
"enableFillAsCustomAttribute": true
}

*/

/*
7.3
It is mandatory to add the following required permission field to enable access to UserInfo API to 3P plugins.
enableUserInfo: boolean
*/

/*
7.0
featureFlag experimentalCanvasSupport

enableSWCSupport 7.0

addon = requiredPermissions.enableAddon

enableExperimentalWebviewSupport  6.0.0

experimentalCppSelectorEngine:boolean 5.4.0

allowFocusOnClickForPanels:boolean 5.3.0

stopTabKeyDownToJsOnDefaultAction:boolean 5.3.0

5.1.0:
- network
- localFileSystem
- webview
- allowLocalRendering
- launchProcess
- fonts
- ipc
- enableHostCommunication
- enablePluginCommunication
- allowCodeGenerationFromStrings
- enableWebview
- SpectrumVersion
- experimentalTableV1Support

- description

???

- backgroundEvents
- panelEvents

4.4.1
- hosts


https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/swc/
https://developer.adobe.com/photoshop/uxp/2022/guides/uxp_guide/uxp-misc/manifest-v5/#launch-process
https://developer.adobe.com/photoshop/uxp/2022/guides/uxp_guide/uxp-misc/manifest-v4/photoshop-manifest/#enablemenurecording
https://developer.adobe.com/photoshop/uxp/2022/guides/uxp_guide/uxp-misc/manifest-v4/

https://developer.adobe.com/xd/uxp/uxp/versions/
https://developer.adobe.com/photoshop/uxp/2022/uxp-api/versions3P/

*/


import {JSONSchema} from "../JsonService/jsonSchema";

export const V5PhotoshopData:JSONSchema = {
	properties: {
		apiVersion:{
			enum: [
				1,
				2,
			],
			markdownEnumDescriptions: [
				"# ⚠️ Deprecated. Do not use! \n Signifies that the plugin is using the original Photoshop 2021 implementation. Support for this will be removed.",
				"Signifies that the plugin is using the new modal JavaScript paradigm.",
			],
			markdownDescription: "Settings to enable/disable need for `executeAsModal` which isolates plugin execution and makes it safer. ",
			default: 2,
		},
		loadEvent:{
			enum: [
				"startup",
				"use",
			],
			markdownDescription: "The loadEvent field allows a plugin to specify when it is loaded. Available in Photoshop 23.1 and later",
			markdownEnumDescriptions: [
				"The plugin is loaded automatically shortly after Photoshop is launched.",
				"The plugin is loaded when needed (when its UI become visible, or when a plugin command is executed). This is the default value.",
			],
		},
		enableMenuRecording:{
			type: "boolean",
			default: true,
			markdownDescription: "Menu items (type: `command`) defined in the manifest's entrypoints will appear under that plugin's submenu under the top-level Plugins menu. Those menu items can be recorded as Action steps by setting enableMenuRecording to true. Once set, those menu items will appear in a recorded Action as \"Plugin Menu Command\" along with the label of the menu item. Available in Photoshop 25.0 and later",
		},

		useLegacySPL:{
			type: "boolean",
			doNotSuggest: true,
		},

		addToPluginMenu:{
			type: "boolean",
			markdownDescription: "First party only",
			doNotSuggest: true,
		},

		disableRuntimeGroups:{
			type: "boolean",
			markdownDescription: "First party only",
			doNotSuggest: true,
		},

		disableScriptEngineExclusion:{
			type: "boolean",
			markdownDescription: "First party only",
			doNotSuggest: true,
		},
	},
	markdownDescription: "Photoshop specific properties",
};


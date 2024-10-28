/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";

import * as l10n from "@vscode/l10n";
import { TextDocument } from "../../CssServiceOriginal/cssLanguageTypes";
import { CSSDataManager } from "../../CssServiceOriginal/languageFacts/dataManager";
import * as nodes from "../../CssServiceOriginal/parser/cssNodes";
import {NodeType as NType} from "../../CssServiceOriginal/parser/cssNodes";
import { LintConfigurationSettings, Rule, Rules, Settings } from "./lintRules";
import { Element } from "../../CssServiceOriginal/services/lintUtil";
import {UXPCustomData} from "../UXPCustomData";
import {allKnownFunctionNames, cssData} from "../data/uxpCustomData";
import {Validator} from "../../Validator";
import {LSPServer} from "../../LSPServer";

class NodesByRootMap {
	public data: { [name: string]: { nodes: nodes.Node[]; names: string[] } } =
		{};

	public add(root: string, name: string, node?: nodes.Node | null): void {
		let entry = this.data[root];
		if (!entry) {
			entry = { nodes: [], names: [] };
			this.data[root] = entry;
		}
		entry.names.push(name);
		if (node) {
			entry.nodes.push(node);
		}
	}
}

export class LintVisitor implements nodes.IVisitor {
	static entries(
		node: nodes.Node,
		document: TextDocument,
		settings: LintConfigurationSettings,
		cssDataManager: CSSDataManager,
		entryFilter?: number,
		// make it optional so "original" code can be used but we still can ship something good for mocha tests
		uxpCustomData: UXPCustomData = new UXPCustomData(cssData, LSPServer.validator.versionMatcher.activeUXPVersion),
	): nodes.IMarker[] {
		const visitor = new LintVisitor(document, settings, cssDataManager, uxpCustomData);
		node.acceptVisitor(visitor);
		//visitor.completeValidations();
		return visitor.getEntries(entryFilter);
	}

	private warnings: nodes.IMarker[] = [];
	private settings: LintConfigurationSettings;
	private document: TextDocument;

	private validProperties: {[name: string]: boolean};

	private get isCss(): boolean{
		return this.document.languageId === "css";
	}
	private get isLess(): boolean{
		return this.document.languageId === "less";
	}
	private get isScss(): boolean{
		return this.document.languageId === "scss";
	}

	private constructor(
		document: TextDocument,
		settings: LintConfigurationSettings,
		private cssDataManager: CSSDataManager,
		private uxpCustomData: UXPCustomData,
	) {
		this.document = document;
		this.settings = settings;
		this.validProperties = {};

		const properties = settings.getSetting(Settings.ValidProperties);
		if (Array.isArray(properties)) {
			properties.forEach((p) => {
				if (typeof p === "string") {
					const name = p.trim().toLowerCase();
					if (name.length) {
						this.validProperties[name] = true;
					}
				}
			});
		}
	}

	private findValueInExpression(
		expression: nodes.Expression,
		v: string,
	): boolean {
		let found = false;
		expression.accept((node) => {
			if (node.type === NType.Identifier && node.matches(v)) {
				found = true;
			}
			return !found;
		});
		return found;
	}

	public getEntries(
		filter: number = nodes.Level.Warning | nodes.Level.Error,
	): nodes.IMarker[] {
		return this.warnings.filter((entry) => {
			return (entry.getLevel() & filter) !== 0;
		});
	}

	private addEntry(node: nodes.Node, rule: Rule, details?: string): void {
		const entry = new nodes.Marker(
			node,
			rule,
			this.settings.getRule(rule),
			details,
		);
		this.warnings.push(entry);
	}

	public visitNode(node: nodes.Node): boolean {
		switch (node.type) {
			case NType.Media:
			case NType.Document:
			case NType.Import:
			case NType.Keyframe:
			case NType.Layer:
			case NType.Namespace:
			case NType.Page:
			case NType.PropertyAtRule:
			case NType.Supports:
			case NType.UnknownAtRule:
			case NType.ViewPort:
			case NType.FontFace:
				return this.visitUnknownAtRule(<nodes.UnknownAtRule>node);
			//case NType.BinaryExpression:
			//	return this.visitExpression(<nodes.Expression>node);
			case NType.Ruleset:
			case NType.MixinDeclaration:
				return this.visitRuleSet(<nodes.RuleSet>node);
			/*
			case NType.MixinDeclaration:
			case NType.MixinReference:
			case NType.MixinContentReference:
			case NType.MixinContentDeclaration:
				console.log(node);
				debugger;
			*/
			case NType.SimpleSelector:
				// return this.visitSimpleSelector(<nodes.SimpleSelector>node);
				break;
			case NType.MediaFeature:
				return this.visitMediaFeature(<nodes.MediaFeature>node);
			case NType.Function:
				return this.visitFunction(<nodes.Function>node);
			case NType.NumericValue:
				return this.visitNumericValue(<nodes.NumericValue>node);
			case NType.HexColorValue:
				// return this.visitHexColorValue(<nodes.HexColorValue>node);
				break;

			case NType.Prio:
				// return this.visitPrio(node);
				break;
			case NType.SelectorInterpolation: // 6
			case NType.SelectorCombinator: // 7 &
			case NType.SelectorCombinatorParent:// 8 >
			case NType.SelectorCombinatorSibling: // 9 +
			case NType.SelectorCombinatorAllSiblings: // 10 ~
			case NType.NamespacePrefix: // 73 |
				return this.visitSelectorCombinator(<nodes.Selector>node);
			case NType.PseudoSelector:
				return this.visitPseudoSelector(<nodes.Selector>node);
				break;
		}
		return true;
	}

	private visitExpression(node: nodes.Expression): boolean {

		console.log(node.getText(), node.type);
		return true;
	}

	private visitUnknownAtRule(node: nodes.UnknownAtRule): boolean {
		let rule = node.getText();
		switch (node.type) {
			case NType.Media:
				rule = "@media";
				break;
			case NType.Document:
				rule = "@document";
				break;
			case NType.FontFace:
				rule = "@font-face";
				break;
			case NType.Import:
				rule = "@import";
				break;
			case NType.Keyframe:
				rule = "@keyframes";
				break;
			case NType.Layer:
				rule = "@layer";
				break;
			case NType.Namespace:
				rule = "@namespace";
				break;
			case NType.Page:
				rule = "@page";
				break;
			case NType.PropertyAtRule:
				rule = "@property";
				break;
			case NType.Supports:
				rule = "@supports";
				break;
			case NType.ViewPort:
				rule = "@viewport";
				break;
			case NType.UnknownAtRule: {
				rule = node.getText();
				break;
			}
		}

		// Skip @import in less and scss
		// ! TODO - check how it transpiles
		if (rule === "@import" && (this.isLess || this.isScss)) {
			return true;
		}

		if(!this.uxpCustomData.getValidAtDirective(rule)) {
			this.addEntry(
				node,
				Rules.UnknownAtRules,
				l10n.t("At-rule: '{0}' does not work in {1}.", rule, this.uxpCustomData.versionForDisplay),
			);
			return false; // ?! don't visit children
		}
		return true;
	}

	private visitSelectorCombinator(node: nodes.Selector): boolean {

		// console.log(node.getText(), node.type);
		return true;
	}

	private visitRuleSet(node: nodes.RuleSet): boolean {
		/////////////////////////////////////////////////////////////
		//	Lint - Don't use empty rulesets.
		/////////////////////////////////////////////////////////////
		const declarations = node.getDeclarations();
		if (!declarations) {
			// syntax error
			return false;
		}
		/*
		if (!declarations.hasChildren()) {
			this.addEntry(node.getSelectors(), Rules.EmptyRuleSet);
		}
		*/
		const propertyTable: Element[] = [];
		for (const element of declarations.getChildren()) {
			if (element instanceof nodes.Declaration) {
				propertyTable.push(new Element(element));
			}
		}

		/////////////////////////////////////////////////////////////
		// the rule warns when it finds:
		// width being used with border, border-left, border-right, padding, padding-left, or padding-right
		// height being used with border, border-top, border-bottom, padding, padding-top, or padding-bottom
		// No error when box-sizing property is specified, as it assumes the user knows what he's doing.
		// see https://github.com/CSSLint/csslint/wiki/Beware-of-box-model-size
		/////////////////////////////////////////////////////////////
		/*
		const boxModel = calculateBoxModel(propertyTable);
		if (boxModel.width) {
			let properties: Element[] = [];
			if (boxModel.right.value) {
				properties = union(properties, boxModel.right.properties);
			}
			if (boxModel.left.value) {
				properties = union(properties, boxModel.left.properties);
			}
			if (properties.length !== 0) {
				for (const item of properties) {
					this.addEntry(item.node, Rules.BewareOfBoxModelSize);
				}
				this.addEntry(boxModel.width.node, Rules.BewareOfBoxModelSize);
			}
		}
		if (boxModel.height) {
			let properties: Element[] = [];
			if (boxModel.top.value) {
				properties = union(properties, boxModel.top.properties);
			}
			if (boxModel.bottom.value) {
				properties = union(properties, boxModel.bottom.properties);
			}
			if (properties.length !== 0) {
				for (const item of properties) {
					this.addEntry(item.node, Rules.BewareOfBoxModelSize);
				}
				this.addEntry(boxModel.height.node, Rules.BewareOfBoxModelSize);
			}
		}
		*/
		/////////////////////////////////////////////////////////////
		//	Properties ignored due to display
		/////////////////////////////////////////////////////////////
		/*

		// With 'display: inline-block', 'float' has no effect
		let displayElems = this.fetchWithValue(
			propertyTable,
			"display",
			"inline-block",
		);
		if (displayElems.length > 0) {
			const elem = this.fetch(propertyTable, "float");
			for (let index = 0; index < elem.length; index++) {
				const node = elem[index].node;
				const value = node.getValue();
				if (value && !value.matches("none")) {
					this.addEntry(
						node,
						Rules.PropertyIgnoredDueToDisplay,
						l10n.t(
							"inline-block is ignored due to the float. If 'float' has a value other than 'none', the box is floated and 'display' is treated as 'block'",
						),
					);
				}
			}
		}

		// With 'display: block', 'vertical-align' has no effect
		displayElems = this.fetchWithValue(propertyTable, "display", "block");
		if (displayElems.length > 0) {
			const elem = this.fetch(propertyTable, "vertical-align");
			for (let index = 0; index < elem.length; index++) {
				this.addEntry(
					elem[index].node,
					Rules.PropertyIgnoredDueToDisplay,
					l10n.t(
						"Property is ignored due to the display. With 'display: block', vertical-align should not be used.",
					),
				);
			}
		}
		*/


		/////////////////////////////////////////////////////////////
		//	Unknown propery & When using a vendor-prefixed gradient, make sure to use them all.
		/////////////////////////////////////////////////////////////

		const isExportBlock = node.getSelectors && node.getSelectors().matches(":export");

		if (!isExportBlock) {
			const propertiesBySuffix = new NodesByRootMap();

			for (const element of propertyTable) {
				const decl = element.node;
				if (this.isCSSDeclaration(decl)) {
					const fullName = element.fullPropertyName;


					if (fullName.startsWith("--")) {
						// skip css variables
						continue;
					}

					const uxpPropertyData = this.uxpCustomData.getValidProperty(fullName);

					if (!uxpPropertyData) {
						this.addEntry(
							decl.getProperty()!,
							Rules.UnknownProperty,
							l10n.t("Property: '{0}' does not work in {1}.", decl.getFullPropertyName(), this.uxpCustomData.versionForDisplay),
						);
						continue;
					}

					const value = element.node.getValue();
					if (value) {
						value.accept((node) => {

							const nestedValue = node?.getChild(0)?.getChild(0);

							if (node.type === NType.BinaryExpression && nestedValue) {
								// console.log(node.getText(), node.type);

								if (!nestedValue || nestedValue?.hasChildren()) {
									return true;
								}

								if (nestedValue.type !== NType.Identifier) {
									return true;
								}

								const propValue = node.getText();

								// skip css variables
								if (propValue.startsWith("--")) {
									return false;
								}

								if (fullName === "font-family") {
									const banned = ["sans-serif", "serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "emoji", "math", "fangsong"];
									if (banned.includes(propValue)) {
										this.addEntry(
											node,
											Rules.UnsupportedValue,
											l10n.t("Value: '{0}' does not work in {1}.", node.getText(), this.uxpCustomData.versionForDisplay),
										);
									}
									return false;
								} else if (uxpPropertyData.isValid(propValue) === false) {
									this.addEntry(
										node,
										Rules.UnsupportedValue,
										l10n.t("Value: '{0}' does not work in {1}.", node.getText(), this.uxpCustomData.versionForDisplay),
									);
								}


							}
							return true;
						});
					}


					propertiesBySuffix.add(fullName, fullName, null); // don't pass the node as we don't show errors on the standard

				}
			}
		}

		return true;
	}

	/*
	private visitPrio(node: nodes.Node) {
		/////////////////////////////////////////////////////////////
		//	Don't use !important
		/////////////////////////////////////////////////////////////
		this.addEntry(node, Rules.AvoidImportant);
		return true;
	}
	*/

	private visitNumericValue(node: nodes.NumericValue): boolean {
		const value = node.getValue();
		if(value.unit && !this.uxpCustomData.getValidUnit(value.unit)) {
			this.addEntry(
				node,
				Rules.UnsupportedUnit,
				l10n.t("Unit: '{0}' is not supported in {1}", value.unit, this.uxpCustomData.versionForDisplay),
			);
		}
		return true;
	}

	private isCSSDeclaration(node: nodes.Node): node is nodes.Declaration {
		if (node instanceof nodes.Declaration) {
			if (!(<nodes.Declaration>node).getValue()) {
				return false;
			}
			const property = (<nodes.Declaration>node).getProperty();
			if (!property) {
				return false;
			}
			const identifier = property.getIdentifier();
			if (!identifier || identifier.containsInterpolation()) {
				return false;
			}
			return true;
		}
		return false;
	}
	/*
	private visitHexColorValue(node: nodes.HexColorValue): boolean {
		// Rule: #eeff0011 or #eeff00 or #ef01 or #ef0
		const length = node.length;
		if (length !== 9 && length !== 7 && length !== 5 && length !== 4) {
			this.addEntry(node, Rules.HexColorLength);
		}
		return false;
	}
	*/

	private visitMediaFeature(node: nodes.MediaFeature): boolean {
		const child = node.getChild(0);
		if(!child) {return true;}
		if (child.type === NType.Identifier) {
			const featureName = child.getText().toLowerCase();
			if(!this.uxpCustomData.getValidMediaFeature(featureName)) {
				this.addEntry(
					node,
					Rules.UnsupportedMediaFeature,
					l10n.t("Media Feature: '{0}' is not supported in {1}", featureName, this.uxpCustomData.versionForDisplay),
				);
				return false;
			}
		}

		return true;
	}

	private visitPseudoSelector(node: nodes.Selector): boolean {
		const pseudoName = node.getChild(0)?.getText().toLowerCase();
		if (!pseudoName) {return true;}

		if(!this.uxpCustomData.getValidPseudoClass(pseudoName) && !this.uxpCustomData.getValidPseudoElement(pseudoName)) {
			this.addEntry(
				node,
				Rules.UnsupportedPseudoSelector,
				l10n.t("Pseudo Selector/Element: ':{0}' is not supported in {1}", pseudoName, this.uxpCustomData.versionForDisplay),
			);
		}

		return true;
	}

	private visitFunction(node: nodes.Function): boolean {
		const fnName = node.getName();//.toLowerCase();

		// Have a list of all possible functions in modern browsers (sadly might need to be updated more often)
		// So uxp supported function will be checked same as everything else
		// banned functions will always report an error
		// everything else will just pass

		const foundFunctionRule = this.uxpCustomData.getValidFunctionName(fnName);

		// You can't have custom functions in classic CSS (at least for now)
		// So everything not on our list will be reported as an error
		if (!this.isLess && !this.isScss) {
			if(!foundFunctionRule) {
				this.addEntry(
					node,
					Rules.UnsupportedFunction,
					l10n.t("Function: '{0}' is not supported in {1}", fnName, this.uxpCustomData.versionForDisplay),
				);
			}
			return true;
		}

		// In Less and SCSS we have custom functions
		// So we need to check if it's a custom function
		// We do that by checking if it's in the list of known functions
		// If it is built-in function but not in our list, we report an error
		// If it is built-in function and in our list, we validate as everything else
		// If it's a custom function, we don't report an error
		if (!foundFunctionRule && allKnownFunctionNames.includes(fnName)) {
			this.addEntry(
				node,
				Rules.UnsupportedFunction,
				l10n.t("Function: '{0}' is not supported in {1}", fnName, this.uxpCustomData.versionForDisplay),
			);
		}

		return true;
	}

}

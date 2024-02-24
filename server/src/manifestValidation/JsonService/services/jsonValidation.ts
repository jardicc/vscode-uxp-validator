/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { JSONSchemaService, ResolvedSchema } from "./jsonSchemaService";
import { JSONDocument } from "../parser/jsonParser";

import { TextDocument, ErrorCode, PromiseConstructor, Thenable, LanguageSettings, DocumentLanguageSettings, SeverityLevel, Diagnostic, DiagnosticSeverity, Range, JSONLanguageStatus } from "../jsonLanguageTypes";
import { JSONSchema } from "../jsonSchema";

export class JSONValidation {

	private jsonSchemaService: JSONSchemaService;
	private promise: PromiseConstructor;

	private validationEnabled: boolean | undefined;
	private commentSeverity: DiagnosticSeverity | undefined;

	public constructor(jsonSchemaService: JSONSchemaService, promiseConstructor: PromiseConstructor) {
		this.jsonSchemaService = jsonSchemaService;
		this.promise = promiseConstructor;
		this.validationEnabled = true;
	}

	public configure(raw: LanguageSettings) {
		if (raw) {
			this.validationEnabled = raw.validate !== false;
			this.commentSeverity = raw.allowComments ? undefined : DiagnosticSeverity.Error;
		}
	}

	public doValidation(textDocument: TextDocument, jsonDocument: JSONDocument, documentSettings?: DocumentLanguageSettings, schema?: JSONSchema): Thenable<Diagnostic[]> {
		if (!this.validationEnabled) {
			return this.promise.resolve([]);
		}
		const diagnostics: Diagnostic[] = [];
		const added: { [signature: string]: boolean } = {};
		const addProblem = (problem: Diagnostic) => {
			// remove duplicated messages
			const signature = problem.range.start.line + " " + problem.range.start.character + " " + problem.message;
			if (!added[signature]) {
				added[signature] = true;
				diagnostics.push(problem);
			}
		};
		const getDiagnostics = (schema: ResolvedSchema | undefined) => {
			const schemaValidation = documentSettings?.schemaValidation ? toDiagnosticSeverity(documentSettings.schemaValidation) : DiagnosticSeverity.Warning;
			const schemaRequest = documentSettings?.schemaRequest ? toDiagnosticSeverity(documentSettings.schemaRequest) : DiagnosticSeverity.Warning;

			if (schema) {
				const addSchemaProblem = (errorMessage: string, errorCode: ErrorCode) => {
					if (jsonDocument.root && schemaRequest) {
						const astRoot = jsonDocument.root;
						const property = astRoot.type === "object" ? astRoot.properties[0] : undefined;
						if (property && property.keyNode.value === "$schema") {
							const node = property.valueNode || property;
							const range = Range.create(textDocument.positionAt(node.offset), textDocument.positionAt(node.offset + node.length));
							addProblem(Diagnostic.create(range, errorMessage, schemaRequest, errorCode));
						} else {
							const range = Range.create(textDocument.positionAt(astRoot.offset), textDocument.positionAt(astRoot.offset + 1));
							addProblem(Diagnostic.create(range, errorMessage, schemaRequest, errorCode));
						}
					}
				};
				if (schema.errors.length) {
					addSchemaProblem(schema.errors[0], ErrorCode.SchemaResolveError);
				} else if (schemaValidation) {
					for (const warning of schema.warnings) {
						addSchemaProblem(warning, ErrorCode.SchemaUnsupportedFeature);
					}
					const semanticErrors = jsonDocument.validate(textDocument, schema.schema, schemaValidation, documentSettings?.schemaDraft);
					if (semanticErrors) {
						semanticErrors.forEach(addProblem);
					}
				}
			}


			return diagnostics;
		};

		if (schema) {
			const uri = schema.id || ("schemaservice://untitled/" + idCounter++);
			const handle = this.jsonSchemaService.registerExternalSchema({ uri, schema });
			return handle.getResolvedSchema().then(resolvedSchema => {
				return getDiagnostics(resolvedSchema);
			});
		}
		return this.jsonSchemaService.getSchemaForResource(textDocument.uri, jsonDocument).then(schema => {
			return getDiagnostics(schema);
		});
	}

	public getLanguageStatus(textDocument: TextDocument, jsonDocument: JSONDocument): JSONLanguageStatus {
		return { schemas: this.jsonSchemaService.getSchemaURIsForResource(textDocument.uri, jsonDocument) };
	}
}

let idCounter = 0;

function toDiagnosticSeverity(severityLevel: SeverityLevel | undefined):DiagnosticSeverity | undefined {
	switch (severityLevel) {
		case "error": return DiagnosticSeverity.Error;
		case "warning": return DiagnosticSeverity.Warning;
		case "ignore": return undefined;
	}
	return undefined;
}
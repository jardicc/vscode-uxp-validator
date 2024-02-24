import * as vscode from "vscode";
import { EXTENSION_ID } from "../../common/constants";
import {ISettings} from "../../common/types";

export class Settings {

	constructor() {
	}

	private get _settings(): vscode.WorkspaceConfiguration {
		return vscode.workspace.getConfiguration(EXTENSION_ID);
	}

	/**
	 * Version of the config. Used to determine if the config has changed and remove/migrate old settings.
	 */
	/*
	public get configVersion(): number|undefined{
		return this._settings.get("configVersion"); // TODO initial version
	}
	*/

	public get autoDetectVersion(): boolean {
		const res = this._settings.get("autoDetectVersion"); // TODO initial version
		if (typeof res !== "boolean") {
			throw new Error("autoDetectVersion is undefined");
		}
		return res;
	}

	public async setAutoDetectVersion(value: boolean) {
		await this._settings.update("autoDetectVersion", value, true);
	}

	/**
	 * The version of the UXP validator to use.
	 */
	public get version(): string {
		const res = this._settings.get("version"); // TODO initial version
		if (typeof res !== "string") {
			throw new Error("autoDetectVersion is undefined");
		}
		return res;
	}
	public async setVersion(value: string) {
		this._settings.update("version", value, true);
	}

	/**
	 * Whether the UXP validator is enabled.
	 */
	public get enabled(): boolean {
		const res = this._settings.get("enabled"); // TODO initial version
		if (typeof res !== "boolean") {
			throw new Error("autoDetectVersion is undefined");
		}
		return res;
	}
	public set enabled(value: boolean) {
		this._settings.update("enabled", value, true);
	}

	// TODO include/exclude glob patterns

	public toObject(): ISettings {
		return {
			enabled: this.enabled,
			version: this.version,
			autoDetectVersion: this.autoDetectVersion,
		};
	}
}
import * as vscode from "vscode";
import {LanguageClient} from "vscode-languageclient/node";
import {versionTable} from "../../common/versionTable";
import {THostApp} from "../../common/types";
import {VersionMatcher, dateToYMD} from "../../common/VersionMatcher";
import {COMMANDS, EXTENSION_ID} from "../../common/constants";
import {Settings} from "./Settings";
import {requestServer, setClientRequestHandlers} from "./clientRequestHandlers";

class UI{

	public statusBarItem: vscode.StatusBarItem | undefined;
	public client!: LanguageClient;
	private uxpVersion: string = "n/a";
	private uxpEnabled: boolean = false;
	private settings: Settings = new Settings();

	constructor() {
		//
	}

	public start(client: LanguageClient) {
		this.client = client;
		setClientRequestHandlers();
		this.setCommands();
		this.addStatusBarMenu();

		vscode.workspace.onDidChangeConfiguration((event) => {
			// TODO add enable/disable support
			if (event.affectsConfiguration(EXTENSION_ID)) {
				requestServer.restartServer();
			}
		});
	}

	private getVersionLabel = () => {
		return `UXP: ${this.uxpVersion}`;
	};

	public onValidatorStateChange(enabled: boolean) {
		this.uxpEnabled = enabled;
		this.updateStatusBar();
	}

	public onVersionChange(uxpVersion: string) {
		this.uxpVersion = uxpVersion;
		this.updateStatusBar();
	}

	private setCommands() {
		vscode.commands.registerCommand(COMMANDS.ENABLE, () => requestServer.enableValidator(true));
		vscode.commands.registerCommand(COMMANDS.DISABLE, () => requestServer.enableValidator(false));
		vscode.commands.registerCommand(COMMANDS.SET_VERSION, () => this.pickVersion());
		vscode.commands.registerCommand(COMMANDS.SHOW_MAIN_PICK, () => this.mainPick());
		console.log("commands set");
	}

	private async pickVersion() {
		const menuItems: ICustomQuickPickItem[] = [
			{
				label: "Auto detect from manifest.json",
				detail: this.settings.autoDetectVersion ? "(Active setting)" : undefined,
				$autoDetect: true,
			},
		];

		for (const _appKey in versionTable) {
			const appKey: THostApp = _appKey as THostApp;
			menuItems.push({
				kind: vscode.QuickPickItemKind.Separator,
				label: appKey,
			});

			for (const versionKey in versionTable[appKey]) {
				const item = versionTable[appKey][versionKey];
				const found = VersionMatcher.findV8Version(item.uxp);
				if (!found) {
					continue;
				}
				const isSelected = this.settings.version === item.uxp && !this.settings.autoDetectVersion;
				menuItems.push({
					label: `${isSelected ? "➡️ " : ""}${appKey} ${versionKey}`,
					description: `— UXP: ${item.uxp} | ${dateToYMD(item.date)} | V8: ${found.v8} | ES: ${found.es}`,
					// detail: (this.settings.version === item.uxp && !this.settings.autoDetectVersion) ? "Current setting" : undefined,
					$appKey: appKey,
					$versionKey: versionKey,
					$uxp: item.uxp,
				});
			}
		}

		const selectedItem = await vscode.window.showQuickPick(menuItems, {title: "Select UXP version to validate against"}) as ICustomQuickPickItem;

		// User canceled the quick pick
		if (!selectedItem) {
			return;
		}

		// Set preferences and restart server
		if (typeof selectedItem.$appKey === "string" && typeof selectedItem.$versionKey === "string" && typeof selectedItem.$uxp === "string") {
			await this.settings.setVersion(selectedItem.$uxp);
			await this.settings.setAutoDetectVersion(false);
			requestServer.restartServer();
			console.log(`version ${selectedItem.$uxp} chosen in menu`);
		} else if (selectedItem.$autoDetect) {
			await this.settings.setAutoDetectVersion(true);
			requestServer.restartServer();
			console.log("auto detect chosen in menu");
		}
	}

	private async mainPick() {
		const items: IQuickPickItemID[] = [
			{
				label: "Start",
				id: COMMANDS.ENABLE,
			},
			{
				label: "Stop",
				id: COMMANDS.DISABLE,
			},
			{
				label: "Set version",
				id: COMMANDS.SET_VERSION,
				description: this.getVersionLabel(),
			},
		];

		const selectedItem = await vscode.window.showQuickPick(items, {title: "UXP Validator"});

		// User canceled the quick pick
		if (!selectedItem) {
			return;
		}

		// Handle the selected command
		await vscode.commands.executeCommand(selectedItem.id);
	}

	private updateStatusBar() {
		if (!this.statusBarItem) {
			return;
		}
		this.statusBarItem.text =  this.uxpEnabled ? `$(bracket) ${this.getVersionLabel()}` : "$(x) UXP Validator";
	}

	private addStatusBarMenu() {
		console.log(vscode);
		const item = vscode.window.createStatusBarItem(
			vscode.StatusBarAlignment.Right,
			100,
		);
		console.log(item);
		this.statusBarItem = item;
		this.statusBarItem.command = COMMANDS.SHOW_MAIN_PICK;
		this.statusBarItem.tooltip = "UXP Validator";
		this.updateStatusBar();
		this.statusBarItem.show();
	}
}


export const ui = new UI();

interface ICustomQuickPickItem extends vscode.QuickPickItem{
	$appKey?: THostApp
	$versionKey?: string
	$uxp?: string
	$autoDetect?: boolean
}

interface IQuickPickItemID extends vscode.QuickPickItem{
	id:string
}
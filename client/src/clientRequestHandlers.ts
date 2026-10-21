import {CLIENT_REQUESTS, SERVER_REQUESTS} from "../../common/constants";
import {ui} from "./UI";
import {IPickVersionArg} from "../../common/types";

export function setClientRequestHandlers() {
	ui.client.onRequest(CLIENT_REQUESTS.ENABLE_VALIDATOR, ui.onValidatorStateChange.bind(ui));
	ui.client.onRequest(CLIENT_REQUESTS.SET_VERSION, ui.onVersionChange.bind(ui));
}

export const requestServer = {
	enableValidator(enabled: boolean) {
		void ui.client.sendRequest(SERVER_REQUESTS.ENABLE_VALIDATOR, enabled).catch(error => {
			console.error("Unable to update validator state:", error);
		});
		console.log(SERVER_REQUESTS.ENABLE_VALIDATOR, enabled);
	},
	setVersion(arg: IPickVersionArg) {
		void ui.client.sendRequest(SERVER_REQUESTS.SET_VERSION, arg).catch(error => {
			console.error("Unable to update UXP version:", error);
		});
		console.log(SERVER_REQUESTS.ENABLE_VALIDATOR, arg);
	},
	restartServer() {
		void ui.client.sendRequest(SERVER_REQUESTS.RESTART_SERVER).catch(error => {
			console.error("Unable to restart validator:", error);
		});
		console.log(SERVER_REQUESTS.RESTART_SERVER);
	},
};
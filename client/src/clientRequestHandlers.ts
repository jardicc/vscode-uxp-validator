import {CLIENT_REQUESTS, SERVER_REQUESTS} from "../../common/constants";
import {ui} from "./UI";
import {IPickVersionArg} from "../../common/types";

export function setClientRequestHandlers() {
	ui.client.onRequest(CLIENT_REQUESTS.ENABLE_VALIDATOR, ui.onValidatorStateChange.bind(ui));
	ui.client.onRequest(CLIENT_REQUESTS.SET_VERSION, ui.onVersionChange.bind(ui));
}

export const requestServer = {
	enableValidator(enabled: boolean) {
		ui.client.sendRequest(SERVER_REQUESTS.ENABLE_VALIDATOR, enabled);
		console.log(SERVER_REQUESTS.ENABLE_VALIDATOR, enabled);
	},
	setVersion(arg: IPickVersionArg) {
		ui.client.sendRequest(SERVER_REQUESTS.SET_VERSION, arg);
		console.log(SERVER_REQUESTS.ENABLE_VALIDATOR, arg);
	},
	restartServer() {
		ui.client.sendRequest(SERVER_REQUESTS.RESTART_SERVER);
		console.log(SERVER_REQUESTS.RESTART_SERVER);
	},
};
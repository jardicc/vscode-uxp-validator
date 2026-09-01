import {Connection} from "vscode-languageserver";
import {LSPServer} from "./LSPServer";
import { CLIENT_REQUESTS, SERVER_REQUESTS } from "../../common/constants";

/**
 * Listen and handle client requests
 * @param connection
 */
export function setServerRequestHandlers(connection: Connection) {
	connection.onRequest(SERVER_REQUESTS.ENABLE_VALIDATOR, LSPServer.onEnableValidator.bind(LSPServer));
	connection.onRequest(SERVER_REQUESTS.SET_VERSION, LSPServer.onSetVersion.bind(LSPServer));
	connection.onRequest(SERVER_REQUESTS.RESTART_SERVER, LSPServer.onRestartServer.bind(LSPServer));
}

export const requestClient = {
	/**
	 * Send request to client to update validator state
	 * @param enabled
	 */
	enableValidator(enabled: boolean) {
		void LSPServer.connection.sendRequest(CLIENT_REQUESTS.ENABLE_VALIDATOR, enabled).catch(error => {
			LSPServer.connection.console.error(`Unable to update validator state in the client: ${String(error)}`);
		});
		console.log(CLIENT_REQUESTS.ENABLE_VALIDATOR, enabled);

	},
	/**
	 * Send request to client to update validator version
	 * @param arg
	 */
	setVersion(arg: string) {
		void LSPServer.connection.sendRequest(CLIENT_REQUESTS.SET_VERSION, arg).catch(error => {
			LSPServer.connection.console.error(`Unable to update UXP version in the client: ${String(error)}`);
		});
		console.log(CLIENT_REQUESTS.SET_VERSION, arg);
	},
};
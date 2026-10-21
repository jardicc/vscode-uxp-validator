//import {name} from "../package.json";
const name = "uxpvalidator";

export const EXTENSION_ID = name;

export const COMMANDS = {
	ENABLE: `${EXTENSION_ID}.enable`,
	DISABLE: `${EXTENSION_ID}.disable`,
	SET_VERSION: `${EXTENSION_ID}.setVersion`,
	SHOW_MAIN_PICK: `${EXTENSION_ID}.showMainPick`,
};

export const CONFIG = {
	ENABLED: `${EXTENSION_ID}.enabled`,
	VERSION: `${EXTENSION_ID}.version`,
	AUTO_DETECT_VERSION: `${EXTENSION_ID}.autoDetectVersion`,
};

/**
 * Messages sent from client to server
 */
export const SERVER_REQUESTS = {
	ENABLE_VALIDATOR: `${EXTENSION_ID}/server/EnableValidator`,
	RESTART_SERVER: `${EXTENSION_ID}/server/RestartServer`,
	SET_VERSION: `${EXTENSION_ID}/server/SetVersion`,
};

/**
 * Messages sent from server to client
 */
export const CLIENT_REQUESTS = {
	ENABLE_VALIDATOR: `${EXTENSION_ID}/client/EnableValidator`,
	SET_VERSION: `${EXTENSION_ID}/client/SetVersion`,
};


import {createRequire} from "node:module";

const requireModule = createRequire(__filename);

export const {jsonrepair} = requireModule("jsonrepair") as {
	jsonrepair: (text: string) => string;
};
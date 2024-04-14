# Contributing

If you found a bug or have feature request please create an issue.

If you want to contribute new code or validation rules please feel free to fork repo and create pull request.

## What you can help with

- My TODO list https://github.com/jardicc/vscode-uxp-validator/issues
- Rate this plugin in Marketplace and/or click the start in Github repo

## How to update CSS/LESS/SASS rules

Validator contains fork of Microsoft css validator service.

- Most of the rules definition for UXP plugin can be found here: [uxpCustomData.ts](https://github.com/jardicc/vscode-uxp-validator/blob/main/server/src/CssService/data/uxpCustomData.ts)
- [How Microsoft is using Custom data](https://github.com/microsoft/vscode-css-languageservice/blob/main/docs/customData.md)
- Custom data maintained by Microsoft: [webCustomData.ts](https://github.com/microsoft/vscode-css-languageservice/blob/main/src/data/webCustomData.ts) You can copy/paste new properties from here once you edit the browsers support
- FYI if you want to understand client/server architecture: [Language server architecture](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide)

- Some additional data are here: [uxpBuiltinData.ts](https://github.com/jardicc/vscode-uxp-validator/blob/main/server/src/CssService/languageFacts/uxpBuiltinData.ts). Only `lineStyle` and `namedColors` are used because those repeat often in multiple properties in custom data.

- Here is server configuration what it should or shouldn't do: [LSPServer.ts](https://github.com/jardicc/vscode-uxp-validator/blob/main/server/src/LSPServer.ts) inlayHint, hover tips and intellisense applies only for manifest file. Diagnosis apply for both manifest and CSS files.

## How to update manifest.json rules

Validator contains fork of Microsoft json validator service.

- Most of the rules can be found in [Schemas](https://github.com/jardicc/vscode-uxp-validator/tree/main/server/src/manifestValidation/Schemas)
- And some very specific version dependent or advanced rules can be found here: [jsonQuirksDetector.ts](https://github.com/jardicc/vscode-uxp-validator/blob/main/server/src/manifestValidation/jsonQuirksDetector.ts)

## Version mapping

- If you have info about new host app releases or want to improve existing one you can do here: [versionTable.ts](https://github.com/jardicc/vscode-uxp-validator/blob/main/common/versionTable.ts)

## How to debug

- Run `npm run watch`
- In VSCode tab "Run and Debug" select "Launch Client" and click "Start Debugging"
- It should open new VSCode window with UXP Validator loaded in it.
- After you change the code and save it select the debugged VSCode window and press Ctrl+R to reload changes.

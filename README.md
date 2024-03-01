# Validator for UXP - Beta

UXP (Unified Extensibility Platform) is the modern way to create plugins and scripts for Adobe Creative Cloud

This plugin validates `manifest.json` and CSS, LESS, SCSS files for UXP compatibility.

## Functionality

- Validates manifest.json for UXP compatibility
- Supports manifestVersion 4 and 5. Simply change the number and schema will switch
- Also supports auto-completion for manifest.json
- Validates CSS, LESS, SCSS files for UXP compatibility
- Use statusbar button to:
  - enable/disable plugin
  - change UXP version to validate against

## How to install

[Download from VS Marketplace: Validator for UXP (Beta)](https://marketplace.visualstudio.com/items?itemName=JaroslavBereza.uxpvalidator)

## How to use

In VSCode type `UXP` in commands pallette
![commands](/media/commands.png)

By default it detects UXP version from manifest file but you can override it.

Alternatively you can also use menu in VSCode status bar.

## Feedback

If you find any issue or new rule to implement please create issue in this [GitHub repo](https://github.com/jardicc/vscode-uxp-validator/issues).

## Style validation

Although UXP looks like a browser it is not browser. All CSS support has to be explicitly implemented including
units, selectors, css properties and other features. Different UXP versions support different properties and different
host apps (e.g. Photoshop) implements different UXP version. Validator for UXP is here to help.

![inlay hint example](/media/css-validation.png)

## manifest.json

### Version hints

Shows UXP version, host app release date, EcmaScript version and version of V8 engine included in the oldest(min) host
app version you decided to support. So you can make better decision on what and how should be supported in older versions.

![inlay hint example](/media/min-version.gif)

### Intellisense

![intellisense example](/media/intellisense.png)

### Validation

![validation example](/media/manifest-validation.png)

### Version support checks

Not all manifest parts are supported in older versions of host apps.

![version support example](/media/manifest-version-support.png)


## Out of scope

- `manifestVersion: 3` validation (often used in Experience Designer)
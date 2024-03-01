# Validator for UXP - WIP

Validates manifest.json and CSS, LESS, SCSS files for UXP compatibility.

## Functionality

- Validates manifest.json for UXP compatibility
- Supports manifestVersion 4 and 5. Simply change the number and schema will switch
- Also supports auto-completion for manifest.json
- Validates CSS, LESS, SCSS files for UXP compatibility
- Use statusbar button to:
  - enable/disable plugin
  - change UXP version to validate against

## manifest.json

### Version hints

![intellisense example](/media/min-version.mp4)

### Intellisense

![intellisense example](/media/intellisense.png)

### Validation

![validation example](/media/manifest-validation.png)

### Version support checks

![version support example](/media/manifest-version-support.png)


## Out of scope

- `manifestVersion: 3` validation (often used in Experience Designer)
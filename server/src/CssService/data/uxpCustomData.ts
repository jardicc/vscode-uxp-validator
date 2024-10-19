/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// file generated from @vscode/web-custom-data NPM package

import { UXPCSSDataV1 } from "../cssLanguageTypes";
import {lineStyles, namedColors} from "../languageFacts/uxpBuiltinData";

export const cssData: UXPCSSDataV1 = {
	//version: 1.1,
	properties: [
		{
			"name": "align-content",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "center",
					"description": "Lines are packed toward the center of the flex container.",
				},
				{
					"name": "flex-end",
					"description": "Lines are packed toward the end of the flex container.",
				},
				{
					"name": "flex-start",
					"description": "Lines are packed toward the start of the flex container.",
				},
				{
					"name": "space-around",
					"description": "Lines are evenly distributed in the flex container, with half-size spaces on either end.",
				},
				{
					"name": "space-between",
					"description": "Lines are evenly distributed in the flex container.",
				},
				{
					"name": "stretch",
					"description": "Lines stretch to take up the remaining space.",
				},
			],
			"syntax": "normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>",
			"relevance": 65,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/align-content",
				},
			],
			"description": "Aligns a flex container's lines within the flex container when there is extra space in the cross-axis, similar to how 'justify-content' aligns individual items within the main-axis.",
			"restrictions": [
				"enum",
			],
		},
		{
			"name": "align-items",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "center",
					"description": "The flex item's margin box is centered in the cross axis within the line.",
				},
				{
					"name": "flex-end",
					"description": "The cross-end margin edge of the flex item is placed flush with the cross-end edge of the line.",
				},
				{
					"name": "flex-start",
					"description": "The cross-start margin edge of the flex item is placed flush with the cross-start edge of the line.",
				},
				{
					"name": "stretch",
					"description": "If the cross size property of the flex item computes to auto, and neither of the cross-axis margins are auto, the flex item is stretched.",
				},
			],
			"syntax": "normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ]",
			"relevance": 86,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/align-items",
				},
			],
			"description": "Aligns flex items along the cross axis of the current line of the flex container.",
			"restrictions": [
				"enum",
			],
		},
		{
			"name": "align-self",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "center",
					"description": "The flex item's margin box is centered in the cross axis within the line.",
				},
				{
					"name": "flex-end",
					"description": "The cross-end margin edge of the flex item is placed flush with the cross-end edge of the line.",
				},
				{
					"name": "flex-start",
					"description": "The cross-start margin edge of the flex item is placed flush with the cross-start edge of the line.",
				},
				{
					"name": "stretch",
					"description": "If the cross size property of the flex item computes to auto, and neither of the cross-axis margins are auto, the flex item is stretched.",
				},
			],
			"syntax": "auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position>",
			"relevance": 73,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/align-self",
				},
			],
			"description": "Allows the default alignment along the cross axis to be overridden for individual flex items.",
			"restrictions": [
				"enum",
			],
		},
		// TODO add repeat checking
		{
			"name": "background",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "fixed",
					"description": "The background is fixed with regard to the viewport. In paged media where there is no viewport, a 'fixed' background is fixed with respect to the page box and therefore replicated on every page.",
				},
				{
					"name": "local",
					"description": "The background is fixed with regard to the element's contents: if the element has a scrolling mechanism, the background scrolls with the element's contents.",
				},
				{
					"name": "none",
					"description": "A value of 'none' counts as an image layer but draws nothing.",
				},
				{
					"name": "scroll",
					"description": "The background is fixed with regard to the element itself and does not scroll with its contents. (It is effectively attached to the element's border.)",
				},
				...namedColors,
			],
			"syntax": "[ <bg-layer> , ]* <final-bg-layer>",
			"relevance": 93,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/background",
				},
			],
			"description": "Shorthand property for setting most background properties at the same place in the style sheet.",
			"restrictions": [
				"enum",
				"image",
				"color",
				"position",
				"length",
				"repeat",
				"percentage",
				"box",
			],
		},
		{
			"name": "background-attachment",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "scroll",
					"description": "The background is fixed with regard to the element itself and does not scroll with its contents. (It is effectively attached to the element's border.)",
				},
			],
			"syntax": "<attachment>#",
			"relevance": 54,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/background-attachment",
				},
			],
			"description": "Specifies whether the background images are fixed with regard to the viewport ('fixed') or scroll along with the element ('scroll') or its contents ('local').",
			"restrictions": [
				"enum",
			],
		},
		{
			"name": "background-color",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<color>",
			"relevance": 94,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/background-color",
				},
			],
			values: namedColors,
			"description": "Sets the background color of an element.",
			"restrictions": [
				"color",
			],
		},
		// TODO add repeat checking
		{
			"name": "background-image",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "none",
					"description": "Counts as an image layer but draws nothing.",
				},
			],
			"syntax": "<bg-image>#",
			"relevance": 88,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/background-image",
				},
			],
			"description": "Sets the background image(s) of an element.",
			"restrictions": [
				"image",
				"enum",
			],
		},
		{
			"name": "background-repeat",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "no-repeat",
				},
			],
			"syntax": "<repeat-style>#",
			"relevance": 85,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/background-repeat",
				},
			],
			"description": "Specifies how background images are tiled after they have been sized and positioned.",
			"restrictions": [
				"enum",
			],
		},
		{
			"name": "background-size",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "contain",
					"description": "Scale the image, while preserving its intrinsic aspect ratio (if any), to the largest size such that both its width and its height can fit inside the background positioning area.",
				},
				{
					"name": "cover",
					"description": "Scale the image, while preserving its intrinsic aspect ratio (if any), to the smallest size such that both its width and its height can completely cover the background positioning area.",
				},
			],
			"syntax": "<bg-size>#",
			"relevance": 85,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/background-size",
				},
			],
			"description": "Specifies the size of the background images.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "border",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<line-width> || <line-style> || <color>",
			"relevance": 95,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border",
				},
			],
			values: [
				...lineStyles,
				...namedColors,
			],
			"description": "Shorthand property for setting border width, style, and color.",
			"restrictions": [
				"length",
				"line-width",
				"line-style",
				"color",
			],
		},
		{
			"name": "border-bottom",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<line-width> || <line-style> || <color>",
			"relevance": 88,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-bottom",
				},
			],
			"description": "Shorthand property for setting border width, style and color.",
			values: [
				...lineStyles,
				...namedColors,
			],
			"restrictions": [
				"length",
				"line-width",
				"line-style",
				"color",
			],
		},
		{
			"name": "border-bottom-color",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<'border-top-color'>",
			"relevance": 72,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-bottom-color",
				},
			],
			values: namedColors,
			"description": "Sets the color of the bottom border.",
			"restrictions": [
				"color",
			],
		},
		{
			"name": "border-bottom-left-radius",
			"browsers": [
				"UXP3.0",
			],
			"syntax": "<length-percentage>{1,2}",
			"relevance": 75,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-bottom-left-radius",
				},
			],
			"description": "Defines the radii of the bottom left outer border edge.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "border-bottom-right-radius",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<length-percentage>{1,2}",
			"relevance": 75,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-bottom-right-radius",
				},
			],
			"description": "Defines the radii of the bottom right outer border edge.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "border-bottom-style",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<line-style>",
			"relevance": 59,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-bottom-style",
				},
			],
			"description": "Sets the style of the bottom border.",
			values: lineStyles,
			"restrictions": [
				"line-style",
			],
		},
		{
			"name": "border-bottom-width",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<line-width>",
			"relevance": 64,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-bottom-width",
				},
			],
			"description": "Sets the thickness of the bottom border.",
			"restrictions": [
				"length",
				"line-width",
			],
		},
		{
			"name": "border-color",
			"browsers": [
				"UXP2.0",
			],
			values: namedColors,
			"syntax": "<color>{1,4}",
			"relevance": 87,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-color",
				},
			],
			"description": "The color of the border around all four edges of an element.",
			"restrictions": [
				"color",
			],
		},
		{
			"name": "border-left",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<line-width> || <line-style> || <color>",
			"relevance": 83,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-left",
				},
			],
			values: [
				...lineStyles,
				...namedColors,
			],
			"description": "Shorthand property for setting border width, style and color",
			"restrictions": [
				"length",
				"line-width",
				"line-style",
				"color",
			],
		},
		{
			"name": "border-left-color",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<color>",
			"relevance": 67,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-left-color",
				},
			],
			values: namedColors,
			"description": "Sets the color of the left border.",
			"restrictions": [
				"color",
			],
		},
		{
			"name": "border-left-style",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<line-style>",
			"relevance": 54,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-left-style",
				},
			],
			"description": "Sets the style of the left border.",
			values: lineStyles,
			"restrictions": [
				"line-style",
			],
		},
		{
			"name": "border-left-width",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<line-width>",
			"relevance": 60,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-left-width",
				},
			],
			"description": "Sets the thickness of the left border.",
			"restrictions": [
				"length",
				"line-width",
			],
		},
		{
			"name": "border-radius",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<length-percentage>{1,4} [ / <length-percentage>{1,4} ]?",
			"relevance": 92,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-radius",
				},
			],
			"description": "Defines the radii of the outer border edge.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "border-right",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<line-width> || <line-style> || <color>",
			"relevance": 82,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-right",
				},
			],
			"description": "Shorthand property for setting border width, style and color",
			values: [
				...lineStyles,
				...namedColors,
			],
			"restrictions": [
				"length",
				"line-width",
				"line-style",
				"color",
			],
		},
		{
			"name": "border-right-color",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<color>",
			"relevance": 66,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-right-color",
				},
			],
			"description": "Sets the color of the right border.",
			values: namedColors,
			"restrictions": [
				"color",
			],
		},
		{
			"name": "border-right-style",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<line-style>",
			"relevance": 53,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-right-style",
				},
			],
			"description": "Sets the style of the right border.",
			values: lineStyles,
			"restrictions": [
				"line-style",
			],
		},
		{
			"name": "border-right-width",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<line-width>",
			"relevance": 60,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-right-width",
				},
			],
			"description": "Sets the thickness of the right border.",
			"restrictions": [
				"length",
				"line-width",
			],
		},
		{
			"name": "border-style",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<line-style>{1,4}",
			"relevance": 81,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-style",
				},
			],
			"description": "The style of the border around edges of an element.",
			values: lineStyles,
			"restrictions": [
				"line-style",
			],
		},
		{
			"name": "border-top",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<line-width> || <line-style> || <color>",
			"relevance": 87,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-top",
				},
			],
			"description": "Shorthand property for setting border width, style and color",
			values: lineStyles,
			"restrictions": [
				"length",
				"line-width",
				"line-style",
				"color",
			],
		},
		{
			"name": "border-top-color",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<color>",
			"relevance": 72,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-top-color",
				},
			],
			"description": "Sets the color of the top border.",
			values: namedColors,
			"restrictions": [
				"color",
			],
		},
		{
			"name": "border-top-left-radius",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<length-percentage>{1,2}",
			"relevance": 76,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-top-left-radius",
				},
			],
			"description": "Defines the radii of the top left outer border edge.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "border-top-style",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<line-style>",
			"relevance": 58,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-top-style",
				},
			],
			"description": "Sets the style of the top border.",
			values: lineStyles,
			"restrictions": [
				"line-style",
			],
		},
		{
			"name": "border-top-width",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<line-width>",
			"relevance": 61,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-top-width",
				},
			],
			"description": "Sets the thickness of the top border.",
			"restrictions": [
				"length",
				"line-width",
			],
		},
		{
			"name": "border-width",
			"browsers": [
				"UXP2.0",
			],
			"values": [],
			"syntax": "<line-width>{1,4}",
			"relevance": 83,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/border-width",
				},
			],
			"description": "Shorthand that sets the four 'border-*-width' properties. If it has four values, they set top, right, bottom and left in that order. If left is missing, it is the same as right; if bottom is missing, it is the same as top; if right is missing, it is the same as top.",
			"restrictions": [
				"length",
				"line-width",
			],
		},
		{
			"name": "bottom",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "auto",
					"description": "For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well",
				},
			],
			"syntax": "<length> | <percentage> | auto",
			"relevance": 90,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/bottom",
				},
			],
			"description": "Specifies how far an absolutely positioned box's bottom margin edge is offset above the bottom edge of the box's 'containing block'.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "color",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<color>",
			"relevance": 95,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/color",
				},
			],
			"description": "Sets the color of an element's text",
			values: namedColors,
			"restrictions": [
				"color",
			],
		},
		{
			"name": "display",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "block",
					"description": "The element generates a block-level box",
				},
				{
					"name": "flex",
					"browsers": [
						"UXP3.0",
					],
					"description": "The element generates a principal flex container box and establishes a flex formatting context.",
				},
				{
					"name": "inline",
					"description": "The element generates an inline-level box.",
				},
				{
					"name": "inline-block",
					"description": "A block box, which itself is flowed as a single inline box, similar to a replaced element. The inside of an inline-block is formatted as a block box, and the box itself is formatted as an inline box.",
				},
				{
					"name": "inline-flex",
					"browsers": [
						"UXP3.0",
					],
					"description": "Inline-level flex container.",
				},
				{
					"name": "none",
					"description": "The element and its descendants generates no boxes.",
				},
			],
			"syntax": "[ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>",
			"relevance": 96,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/display",
				},
			],
			"description": "In combination with 'float' and 'position', determines the type of box or boxes that are generated for an element.",
			"restrictions": [
				"enum",
			],
		},
		{
			"name": "flex",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "auto",
					"description": "Retrieves the value of the main size property as the used 'flex-basis'.",
				},
				{
					"name": "content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Indicates automatic sizing, based on the flex item's content.",
				},
				{
					"name": "none",
					"description": "Expands to '0 0 auto'.",
				},
			],
			"syntax": "none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]",
			"relevance": 80,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/flex",
				},
			],
			"description": "Specifies the components of a flexible length: the flex grow factor and flex shrink factor, and the flex basis.",
			"restrictions": [
				"length",
				"number",
				"percentage",
			],
		},
		{
			"name": "flex-basis",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "auto",
					"description": "Retrieves the value of the main size property as the used 'flex-basis'.",
				},
				{
					"name": "content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Indicates automatic sizing, based on the flex item's content.",
				},
			],
			"syntax": "content | <'width'>",
			"relevance": 69,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/flex-basis",
				},
			],
			"description": "Sets the flex basis.",
			"restrictions": [
				"length",
				"number",
				"percentage",
			],
		},
		{
			"name": "flex-direction",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "column",
					"description": "The flex container's main axis has the same orientation as the block axis of the current writing mode.",
				},
				{
					"name": "column-reverse",
					"description": "Same as 'column', except the main-start and main-end directions are swapped.",
				},
				{
					"name": "row",
					"description": "The flex container's main axis has the same orientation as the inline axis of the current writing mode.",
				},
				{
					"name": "row-reverse",
					"description": "Same as 'row', except the main-start and main-end directions are swapped.",
				},
			],
			"syntax": "row | row-reverse | column | column-reverse",
			"relevance": 83,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/flex-direction",
				},
			],
			"description": "Specifies how flex items are placed in the flex container, by setting the direction of the flex container's main axis.",
			"restrictions": [
				"enum",
			],
		},
		{
			"name": "flex-grow",
			"browsers": [
				"UXP3.0",
			],
			"syntax": "<number>",
			"relevance": 77,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/flex-grow",
				},
			],
			"description": "Sets the flex grow factor. Negative numbers are invalid.",
			"restrictions": [
				"number",
			],
		},
		{
			"name": "flex-shrink",
			"browsers": [
				"UXP3.0",
			],
			"syntax": "<number>",
			"relevance": 75,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/flex-shrink",
				},
			],
			"description": "Sets the flex shrink factor. Negative numbers are invalid.",
			"restrictions": [
				"number",
			],
		},
		{
			"name": "flex-wrap",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "nowrap",
					"description": "The flex container is single-line.",
				},
				{
					"name": "wrap",
					"description": "The flexbox is multi-line.",
				},
			],
			"syntax": "nowrap | wrap | wrap-reverse",
			"relevance": 80,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/flex-wrap",
				},
			],
			"description": "Controls whether the flex container is single-line or multi-line, and the direction of the cross-axis, which determines the direction new lines are stacked in.",
			"restrictions": [
				"enum",
			],
		},
		{
			"name": "font-family",
			"browsers": [
				"UXP2.0",
			],
			"values": [
			],
			"syntax": "<family-name>",
			"relevance": 93,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/font-family",
				},
			],
			"description": "Specifies a prioritized list of font family names or generic family names. A user agent iterates through the list of family names until it matches an available font that contains a glyph for the character to be rendered.",
			"restrictions": [
				"font",
			],
		},
		{
			"name": "font-size",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "large",
				},
				{
					"name": "larger",
				},
				{
					"name": "medium",
				},
				{
					"name": "small",
				},
				{
					"name": "smaller",
				},
				{
					"name": "x-large",
				},
				{
					"name": "x-small",
				},
				{
					"name": "xx-large",
				},
				{
					"name": "xx-small",
				},
			],
			"syntax": "<absolute-size> | <relative-size> | <length-percentage>",
			"relevance": 94,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/font-size",
				},
			],
			"description": "Indicates the desired height of glyphs from the font. For scalable fonts, the font-size is a scale factor applied to the EM unit of the font. (Note that certain glyphs may bleed outside their EM box.) For non-scalable fonts, the font-size is converted into absolute units and matched against the declared font-size of the font, using the same absolute coordinate space for both of the matched values.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "font-style",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "italic",
					"description": "Selects a font that is labeled as an 'italic' face, or an 'oblique' face if one is not",
				},
				{
					"name": "normal",
					"description": "Selects a face that is classified as 'normal'.",
				},
			],
			"syntax": "normal | italic | oblique <angle>{0,2}",
			"relevance": 89,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/font-style",
				},
			],
			"description": "Allows italic or oblique faces to be selected. Italic forms are generally cursive in nature while oblique faces are typically sloped versions of the regular face.",
			"restrictions": [
				"enum",
			],
		},
		{
			"name": "font-weight",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "50",
				},
				{
					"name": "100",
					"description": "Thin",
				},
				{
					"name": "200",
					"description": "Extra Light (Ultra Light)",
				},
				{
					"name": "300",
					"description": "Light",
				},
				{
					"name": "400",
					"description": "Normal",
				},
				{
					"name": "500",
					"description": "Medium",
				},
				{
					"name": "550",
				},
				{
					"name": "600",
					"description": "Semi Bold (Demi Bold)",
				},
				{
					"name": "700",
					"description": "Bold",
				},
				{
					"name": "800",
					"description": "Extra Bold (Ultra Bold)",
				},
				{
					"name": "850",
				},
				{
					"name": "900",
					"description": "Black (Heavy)",
				},
				{
					"name": "950",
				},
				{
					"name": "1000",
				},
				{
					"name": "bold",
					"description": "Same as 700",
				},
				{
					"name": "bolder",
					"description": "Specifies the weight of the face bolder than the inherited value.",
				},
				{
					"name": "lighter",
					"description": "Specifies the weight of the face lighter than the inherited value.",
				},
				{
					"name": "normal",
					"description": "Same as 400",
				},
			],
			"syntax": "<font-weight-absolute>{1,2}",
			"relevance": 93,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/font-weight",
				},
			],
			"description": "Specifies weight of glyphs in the font, their degree of blackness or stroke thickness.",
			"restrictions": [
				"enum",
			],
		},
		{
			"name": "height",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "auto",
					"description": "The height depends on the values of other properties.",
				},
				{
					"name": "fit-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the fit-content inline size or fit-content block size, as appropriate to the writing mode.",
				},
				{
					"name": "max-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the max-content inline size or max-content block size, as appropriate to the writing mode.",
				},
				{
					"name": "min-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the min-content inline size or min-content block size, as appropriate to the writing mode.",
				},
			],
			"syntax": "<viewport-length>{1,2}",
			"relevance": 96,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/height",
				},
			],
			"description": "Specifies the height of the content area, padding area or border area (depending on 'box-sizing') of certain boxes.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "justify-content",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "center",
					"description": "Flex items are packed toward the center of the line.",
				},
				{
					"name": "stretch",
					"description": "If the combined size of the alignment subjects is less than the size of the alignment container, any auto-sized alignment subjects have their size increased equally (not proportionally), while still respecting the constraints imposed by max-height/max-width (or equivalent functionality), so that the combined size exactly fills the alignment container.",
				},
				{
					"name": "flex-end",
					"description": "Flex items are packed toward the end of the line.",
				},
				{
					"name": "flex-start",
					"description": "Flex items are packed toward the start of the line.",
				},
				{
					"name": "space-around",
					"description": "Flex items are evenly distributed in the line, with half-size spaces on either end.",
				},
				{
					"name": "space-between",
					"description": "Flex items are evenly distributed in the line.",
				},
			],
			"syntax": "normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]",
			"relevance": 86,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/justify-content",
				},
			],
			"description": "Aligns flex items along the main axis of the current line of the flex container.",
			"restrictions": [
				"enum",
			],
		},
		{
			"name": "left",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "auto",
					"description": "For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well",
				},
			],
			"syntax": "<length> | <percentage> | auto",
			"relevance": 95,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/left",
				},
			],
			"description": "Specifies how far an absolutely positioned box's left margin edge is offset to the right of the left edge of the box's 'containing block'.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "letter-spacing",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "normal",
					"description": "The spacing is the normal spacing for the current font. It is typically zero-length.",
				},
			],
			"syntax": "normal | <length>",
			"relevance": 81,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/letter-spacing",
				},
			],
			"description": "Specifies the minimum, maximum, and optimal spacing between grapheme clusters.",
			"restrictions": [
				"length",
			],
		},
		{
			"name": "margin",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "auto",
				},
			],
			"syntax": "[ <length> | <percentage> | auto ]{1,4}",
			"relevance": 95,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/margin",
				},
			],
			"description": "Shorthand property to set values for the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "margin-bottom",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "auto",
				},
			],
			"syntax": "<length> | <percentage> | auto",
			"relevance": 91,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/margin-bottom",
				},
			],
			"description": "Shorthand property to set values for the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits..",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "margin-left",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "auto",
				},
			],
			"syntax": "<length> | <percentage> | auto",
			"relevance": 91,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/margin-left",
				},
			],
			"description": "Shorthand property to set values for the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits..",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "margin-right",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "auto",
				},
			],
			"syntax": "<length> | <percentage> | auto",
			"relevance": 91,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/margin-right",
				},
			],
			"description": "Shorthand property to set values for the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits..",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "margin-top",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "auto",
				},
			],
			"syntax": "<length> | <percentage> | auto",
			"relevance": 94,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/margin-top",
				},
			],
			"description": "Shorthand property to set values for the thickness of the margin area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. Negative values for margin properties are allowed, but there may be implementation-specific limits..",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "max-height",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "none",
					"description": "No limit on the height of the box.",
				},
				{
					"name": "fit-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the fit-content inline size or fit-content block size, as appropriate to the writing mode.",
				},
				{
					"name": "max-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the max-content inline size or max-content block size, as appropriate to the writing mode.",
				},
				{
					"name": "min-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the min-content inline size or min-content block size, as appropriate to the writing mode.",
				},
			],
			"syntax": "<viewport-length>",
			"relevance": 85,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/max-height",
				},
			],
			"description": "Allows authors to constrain content height to a certain range.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "max-width",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "none",
					"description": "No limit on the width of the box.",
				},
				{
					"name": "fit-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the fit-content inline size or fit-content block size, as appropriate to the writing mode.",
				},
				{
					"name": "max-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the max-content inline size or max-content block size, as appropriate to the writing mode.",
				},
				{
					"name": "min-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the min-content inline size or min-content block size, as appropriate to the writing mode.",
				},
			],
			"syntax": "<viewport-length>",
			"relevance": 90,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/max-width",
				},
			],
			"description": "Allows authors to constrain content width to a certain range.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "min-height",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "auto",
					"browsers": [
						"UXP3.0",
					],
				},
				{
					"name": "fit-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the fit-content inline size or fit-content block size, as appropriate to the writing mode.",
				},
				{
					"name": "max-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the max-content inline size or max-content block size, as appropriate to the writing mode.",
				},
				{
					"name": "min-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the min-content inline size or min-content block size, as appropriate to the writing mode.",
				},
			],
			"syntax": "<viewport-length>",
			"relevance": 89,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/min-height",
				},
			],
			"description": "Allows authors to constrain content height to a certain range.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "min-width",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "auto",
					"browsers": [
						"UXP3.0",
					],
				},
				{
					"name": "fit-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the fit-content inline size or fit-content block size, as appropriate to the writing mode.",
				},
				{
					"name": "max-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the max-content inline size or max-content block size, as appropriate to the writing mode.",
				},
				{
					"name": "min-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the min-content inline size or min-content block size, as appropriate to the writing mode.",
				},
			],
			"syntax": "<viewport-length>",
			"relevance": 88,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/min-width",
				},
			],
			"description": "Allows authors to constrain content width to a certain range.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "opacity",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<alpha-value>",
			"relevance": 93,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/opacity",
				},
			],
			"description": "Opacity of an element's text, where 1 is opaque and 0 is entirely transparent.",
			"restrictions": [
				"number(0-1)",
			],
		},
		{
			"name": "overflow",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "auto",
					"description": "The behavior of the 'auto' value is UA-dependent, but should cause a scrolling mechanism to be provided for overflowing boxes.",
				},
				{
					"name": "hidden",
					"description": "Content is clipped and no scrolling mechanism should be provided to view the content outside the clipping region.",
				},
				{
					"name": "scroll",
					"description": "Content is clipped and if the user agent uses a scrolling mechanism that is visible on the screen (such as a scroll bar or a panner), that mechanism should be displayed for a box whether or not any of its content is clipped.",
				},
				{
					"name": "visible",
					"description": "Content is not clipped, i.e., it may be rendered outside the content box.",
				},
			],
			"syntax": "[ visible | hidden | clip | scroll | auto ]{1,2}",
			"relevance": 93,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/overflow",
				},
			],
			"description": "Shorthand for setting 'overflow-x' and 'overflow-y'.",
			"restrictions": [
				"enum",
			],
		},
		{
			"name": "overflow-x",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "auto",
					"description": "The behavior of the 'auto' value is UA-dependent, but should cause a scrolling mechanism to be provided for overflowing boxes.",
				},
				{
					"name": "hidden",
					"description": "Content is clipped and no scrolling mechanism should be provided to view the content outside the clipping region.",
				},
				{
					"name": "scroll",
					"description": "Content is clipped and if the user agent uses a scrolling mechanism that is visible on the screen (such as a scroll bar or a panner), that mechanism should be displayed for a box whether or not any of its content is clipped.",
				},
				{
					"name": "visible",
					"description": "Content is not clipped, i.e., it may be rendered outside the content box.",
				},
			],
			"syntax": "visible | hidden | clip | scroll | auto",
			"relevance": 81,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/overflow-x",
				},
			],
			"description": "Specifies the handling of overflow in the horizontal direction.",
			"restrictions": [
				"enum",
			],
		},
		{
			"name": "overflow-y",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "auto",
					"description": "The behavior of the 'auto' value is UA-dependent, but should cause a scrolling mechanism to be provided for overflowing boxes.",
				},
				{
					"name": "hidden",
					"description": "Content is clipped and no scrolling mechanism should be provided to view the content outside the clipping region.",
				},
				{
					"name": "scroll",
					"description": "Content is clipped and if the user agent uses a scrolling mechanism that is visible on the screen (such as a scroll bar or a panner), that mechanism should be displayed for a box whether or not any of its content is clipped.",
				},
				{
					"name": "visible",
					"description": "Content is not clipped, i.e., it may be rendered outside the content box.",
				},
			],
			"syntax": "visible | hidden | clip | scroll | auto",
			"relevance": 83,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/overflow-y",
				},
			],
			"description": "Specifies the handling of overflow in the vertical direction.",
			"restrictions": [
				"enum",
			],
		},
		{
			"name": "padding",
			"browsers": [
				"UXP2.0",
			],
			"values": [],
			"syntax": "[ <length> | <percentage> ]{1,4}",
			"relevance": 96,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/padding",
				},
			],
			"description": "Shorthand property to set values for the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "padding-bottom",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<length> | <percentage>",
			"relevance": 89,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/padding-bottom",
				},
			],
			"description": "Shorthand property to set values for the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "padding-left",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<length> | <percentage>",
			"relevance": 90,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/padding-left",
				},
			],
			"description": "Shorthand property to set values for the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "padding-right",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<length> | <percentage>",
			"relevance": 89,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/padding-right",
				},
			],
			"description": "Shorthand property to set values for the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "padding-top",
			"browsers": [
				"UXP2.0",
			],
			"syntax": "<length> | <percentage>",
			"relevance": 90,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/padding-top",
				},
			],
			"description": "Shorthand property to set values for the thickness of the padding area. If left is omitted, it is the same as right. If bottom is omitted it is the same as top, if right is omitted it is the same as top. The value may not be negative.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "right",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "auto",
					"description": "For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well",
				},
			],
			"syntax": "<length> | <percentage> | auto",
			"relevance": 91,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/right",
				},
			],
			"description": "Specifies how far an absolutely positioned box's right margin edge is offset to the left of the right edge of the box's 'containing block'.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "text-align",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "center",
					"description": "The inline contents are centered within the line box.",
				},
				{
					"name": "left",
					"description": "The inline contents are aligned to the left edge of the line box. In vertical text, 'left' aligns to the edge of the line box that would be the start edge for left-to-right text.",
				},
				{
					"name": "right",
					"description": "The inline contents are aligned to the right edge of the line box. In vertical text, 'right' aligns to the edge of the line box that would be the end edge for left-to-right text.",
				},
			],
			"syntax": "start | end | left | right | center | justify | match-parent",
			"relevance": 93,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/text-align",
				},
			],
			"description": "Describes how inline contents of a block are horizontally aligned if the contents do not completely fill the line box.",
			"restrictions": [
				"string",
			],
		},
		{
			"name": "text-overflow",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "clip",
					"description": "Clip inline content that overflows. Characters may be only partially rendered.",
				},
				{
					"name": "ellipsis",
					"description": "Render an ellipsis character (U+2026) to represent clipped inline content.",
				},
			],
			"syntax": "[ clip | ellipsis | <string> ]{1,2}",
			"relevance": 82,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/text-overflow",
				},
			],
			"description": "Text can overflow for example when it is prevented from wrapping.",
			"restrictions": [
				"enum",
				"string",
			],
		},
		{
			"name": "top",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "auto",
					"description": "For non-replaced elements, the effect of this value depends on which of related properties have the value 'auto' as well",
				},
			],
			"syntax": "<length> | <percentage> | auto",
			"relevance": 95,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/top",
				},
			],
			"description": "Specifies how far an absolutely positioned box's top margin edge is offset below the top edge of the box's 'containing block'.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "visibility",
			"browsers": [
				"UXP3.0",
			],
			"values": [
				{
					"name": "hidden",
					"description": "The generated box is invisible (fully transparent, nothing is drawn), but still affects layout.",
				},
				{
					"name": "visible",
					"description": "The generated box is visible.",
				},
			],
			"syntax": "visible | hidden | collapse",
			"relevance": 88,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/visibility",
				},
			],
			"description": "Specifies whether the boxes generated by an element are rendered. Invisible boxes still affect layout (set the 'display' property to 'none' to suppress box generation altogether).",
			"restrictions": [
				"enum",
			],
		},
		{
			"name": "width",
			"browsers": [
				"UXP2.0",
			],
			"values": [
				{
					"name": "auto",
					"description": "The width depends on the values of other properties.",
				},
				{
					"name": "fit-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the fit-content inline size or fit-content block size, as appropriate to the writing mode.",
				},
				{
					"name": "max-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the max-content inline size or max-content block size, as appropriate to the writing mode.",
				},
				{
					"name": "min-content",
					"browsers": [
						"UXP3.0",
					],
					"description": "Use the min-content inline size or min-content block size, as appropriate to the writing mode.",
				},
			],
			"syntax": "<viewport-length>{1,2}",
			"relevance": 96,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/width",
				},
			],
			"description": "Specifies the width of the content area, padding area or border area (depending on 'box-sizing') of certain boxes.",
			"restrictions": [
				"length",
				"percentage",
			],
		},
		{
			"name": "white-space",
			"syntax": "normal | pre | nowrap | pre-wrap | pre-line | break-spaces",
			"values": [
				{
					"name": "normal", // wrap?
				},
				{
					"name": "pre",
				},
				{
					"name": "nowrap",
				},
				{
					"name": "pre-wrap",
				},
				{
					"name": "pre-line",
				},
			],
			"relevance": 89,
			"browsers": [
				"UXP3.0",
			],
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/white-space",
				},
			],
			"description": "Specifies how whitespace is handled in an element.",
		},
		// ! Change versions
		{
			name: "appearance",
			syntax: "none | auto | textfield | menulist-button | <compat-auto>",
			relevance: 63,
			browsers: ["UXP3.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/appearance",
				},
			],
			description:
        "Changes the appearance of buttons and other controls to resemble native controls.",
		},
		{
			name: "background-blend-mode",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "normal",
					description: "Default attribute which specifies no blending",
				},
				{
					name: "multiply",
					description:
            "The source color is multiplied by the destination color and replaces the destination.",
				},
				{
					name: "screen",
					description:
            "Multiplies the complements of the backdrop and source color values, then complements the result.",
				},
				{
					name: "overlay",
					description:
            "Multiplies or screens the colors, depending on the backdrop color value.",
				},
				{
					name: "darken",
					description: "Selects the darker of the backdrop and source colors.",
				},
				{
					name: "lighten",
					description: "Selects the lighter of the backdrop and source colors.",
				},
				{
					name: "color-dodge",
					description:
            "Brightens the backdrop color to reflect the source color.",
				},
				{
					name: "color-burn",
					description:
            "Darkens the backdrop color to reflect the source color.",
				},
				{
					name: "hard-light",
					description:
            "Multiplies or screens the colors, depending on the source color value.",
				},
				{
					name: "soft-light",
					description:
            "Darkens or lightens the colors, depending on the source color value.",
				},
				{
					name: "difference",
					description:
            "Subtracts the darker of the two constituent colors from the lighter color..",
				},
				{
					name: "exclusion",
					description:
            "Produces an effect similar to that of the Difference mode but lower in contrast.",
				},
				{
					name: "hue",
					browsers: ["UXP3.0"],
					description:
            "Creates a color with the hue of the source color and the saturation and luminosity of the backdrop color.",
				},
				{
					name: "saturation",
					browsers: ["UXP3.0"],
					description:
            "Creates a color with the saturation of the source color and the hue and luminosity of the backdrop color.",
				},
				{
					name: "color",
					browsers: ["UXP3.0"],
					description:
            "Creates a color with the hue and saturation of the source color and the luminosity of the backdrop color.",
				},
				{
					name: "luminosity",
					browsers: ["UXP3.0"],
					description:
            "Creates a color with the luminosity of the source color and the hue and saturation of the backdrop color.",
				},
			],
			syntax: "<blend-mode>#",
			relevance: 51,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/background-blend-mode",
				},
			],
			description: "Defines the blending mode of each background layer.",
			restrictions: ["enum"],
		},
		{
			name: "background-clip",
			browsers: ["UXP3.0"],
			syntax: "<box>#",
			relevance: 68,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/background-clip",
				},
			],
			description: "Determines the background painting area.",
			restrictions: ["box"],
		},
		{
			name: "background-origin",
			browsers: ["UXP3.0"],
			syntax: "<box>#",
			relevance: 54,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/background-origin",
				},
			],
			description:
        "For elements rendered as a single box, specifies the background positioning area. For elements rendered as multiple boxes (e.g., inline boxes on several lines, boxes on several pages) specifies which boxes 'box-decoration-break' operates on to determine the background positioning area(s).",
			restrictions: ["box"],
		},
		{
			name: "background-position-x",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "center",
					description:
            "Equivalent to '50%' ('left 50%') for the horizontal position if the horizontal position is not otherwise specified, or '50%' ('top 50%') for the vertical position if it is.",
				},
				{
					name: "left",
					description:
            "Equivalent to '0%' for the horizontal position if one or two values are given, otherwise specifies the left edge as the origin for the next offset.",
				},
				{
					name: "right",
					description:
            "Equivalent to '100%' for the horizontal position if one or two values are given, otherwise specifies the right edge as the origin for the next offset.",
				},
			],
			syntax:
        "[ center | [ [ left | right | x-start | x-end ]? <length-percentage>? ]! ]#",
			relevance: 55,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/background-position-x",
				},
			],
			description:
        "If background images have been specified, this property specifies their initial position (after any resizing) within their corresponding background positioning area.",
			restrictions: ["length", "percentage"],
		},
		{
			name: "background-position-y",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "bottom",
					description:
            "Equivalent to '100%' for the vertical position if one or two values are given, otherwise specifies the bottom edge as the origin for the next offset.",
				},
				{
					name: "center",
					description:
            "Equivalent to '50%' ('left 50%') for the horizontal position if the horizontal position is not otherwise specified, or '50%' ('top 50%') for the vertical position if it is.",
				},
				{
					name: "top",
					description:
            "Equivalent to '0%' for the vertical position if one or two values are given, otherwise specifies the top edge as the origin for the next offset.",
				},
			],
			syntax:
        "[ center | [ [ top | bottom | y-start | y-end ]? <length-percentage>? ]! ]#",
			relevance: 53,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/background-position-y",
				},
			],
			description:
        "If background images have been specified, this property specifies their initial position (after any resizing) within their corresponding background positioning area.",
			restrictions: ["length", "percentage"],
		},
		{
			name: "border-collapse",
			browsers: ["UXP5.6"],
			values: [
				{
					name: "collapse",
					description: "Selects the collapsing borders model.",
				},
				{
					name: "separate",
					description: "Selects the separated borders border model.",
				},
			],
			syntax: "collapse | separate",
			relevance: 74,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/border-collapse",
				},
			],
			description: "Selects a table's border model.",
			restrictions: ["enum"],
		},
		{
			name: "border-spacing",
			browsers: ["UXP5.6"],
			syntax: "<length> <length>?",
			relevance: 68,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/border-spacing",
				},
			],
			description:
        "The lengths specify the distance that separates adjoining cell borders. If one length is specified, it gives both the horizontal and vertical spacing. If two are specified, the first gives the horizontal spacing and the second the vertical spacing. Lengths may not be negative.",
			restrictions: ["length"],
		},
		{
			name: "border-top-right-radius",
			browsers: ["UXP3.0"],
			syntax: "<length-percentage>{1,2}",
			relevance: 76,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/border-top-right-radius",
				},
			],
			description: "Defines the radii of the top right outer border edge.",
			restrictions: ["length", "percentage"],
		},
		{
			name: "content",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "attr()",
					description:
            "The attr(n) function returns as a string the value of attribute n for the subject of the selector.",
				},
				{
					name: "counter(name)",
					description:
            "Counters are denoted by identifiers (see the 'counter-increment' and 'counter-reset' properties).",
				},
				{
					name: "icon",
					description:
            "The (pseudo-)element is replaced in its entirety by the resource referenced by its 'icon' property, and treated as a replaced element.",
				},
				{
					name: "none",
					description:
            "On elements, this inhibits the children of the element from being rendered as children of this element, as if the element was empty. On pseudo-elements it causes the pseudo-element to have no content.",
				},
				{
					name: "normal",
					description:
            "See http://www.w3.org/TR/css3-content/#content for computation rules.",
				},
				{
					name: "url()",
				},
			],
			syntax:
        "normal | none | [ <content-replacement> | <content-list> ] [/ [ <string> | <counter> ]+ ]?",
			relevance: 90,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/content",
				},
			],
			description:
        "Determines which page-based occurrence of a given element is applied to a counter or string value.",
			restrictions: ["string", "url"],
		},
		{
			name: "cursor",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "auto",
					description: "The UA determines the cursor to display based on the current context.",
				},
				{
					name: "crosshair",
					description: "A simple crosshair (e.g., short line segments resembling a '+' sign). Often used to indicate a two dimensional bitmap selection mode.",
				},
				{
					name: "default",
					description: "The platform-dependent default cursor. Often rendered as an arrow.",
				},
				{
					name: "ew-resize",
					description: "Indicates a bidirectional east-west resize cursor.",
				},
				{
					name: "grab",
					description: "Indicates that something can be grabbed.",
				},
				{
					name: "grabbing",
					description: "Indicates that something is being grabbed.",
				},
				{
					name: "move",
					description: "Indicates something is to be moved.",
				},
				{
					name: "nesw-resize",
					description: "Indicates a bidirectional north-east/south-west cursor.",
				},
				{
					name: "not-allowed",
					description: "Indicates that the requested action will not be carried out. Often rendered as a circle with a line through it.",
				},
				{
					name: "ns-resize",
					description: "Indicates a bidirectional north-south cursor.",
				},
				{
					name: "nwse-resize",
					description: "Indicates a bidirectional north-west/south-east cursor.",
				},
				{
					name: "pointer",
					description: "The cursor is a pointer that indicates a link.",
				},
				{
					name: "text",
					description: "Indicates text that may be selected. Often rendered as a vertical I-beam.",
				},
				{
					name: "zoom-in",
					description: "Indicates that something can be zoomed (magnified) in.",
				},
				{
					name: "zoom-out",
					description: "Indicates that something can be zoomed (magnified) out.",
				},
			],
			syntax:
        "[ [ <url> [ <x> <y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing ] ]",
			relevance: 91,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/cursor",
				},
			],
			description: "Allows control over cursor appearance in an element",
			restrictions: ["url", "number", "enum"],
		},
		{
			name: "fill",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "url()",
					description:
            "A URL reference to a paint server element, which is an element that defines a paint server: 'hatch', 'linearGradient', 'mesh', 'pattern', 'radialGradient' and 'solidcolor'.",
				},
				{
					name: "none",
					description: "No paint is applied in this layer.",
				},
				...namedColors,
			],
			relevance: 77,
			description: "Paints the interior of the given graphical element.",
			restrictions: ["color", "enum", "url"],
		},
		{
			name: "fill-opacity",
			browsers: ["UXP3.0"],
			relevance: 52,
			description:
        "Specifies the opacity of the painting operation used to paint the interior the current object.",
			restrictions: ["number(0-1)"],
		},
		{
			name: "flex-flow",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "column",
					description:
            "The flex container's main axis has the same orientation as the block axis of the current writing mode.",
				},
				{
					name: "column-reverse",
					description:
            "Same as 'column', except the main-start and main-end directions are swapped.",
				},
				{
					name: "nowrap",
					description: "The flex container is single-line.",
				},
				{
					name: "row",
					description:
            "The flex container's main axis has the same orientation as the inline axis of the current writing mode.",
				},
				{
					name: "row-reverse",
					description:
            "Same as 'row', except the main-start and main-end directions are swapped.",
				},
				{
					name: "wrap",
					description: "The flexbox is multi-line.",
				},
				{
					name: "wrap-reverse",
					description:
            "Same as 'wrap', except the cross-start and cross-end directions are swapped.",
				},
			],
			syntax: "<'flex-direction'> || <'flex-wrap'>",
			relevance: 66,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/flex-flow",
				},
			],
			description: "Specifies how flexbox items are placed in the flexbox.",
			restrictions: ["enum"],
		},
		{
			name: "isolation",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "auto",
					description:
            "Elements are not isolated unless an operation is applied that causes the creation of a stacking context.",
				},
				{
					name: "isolate",
					description: "In CSS will turn the element into a stacking context.",
				},
			],
			syntax: "auto | isolate",
			relevance: 52,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/isolation",
				},
			],
			description:
        "In CSS setting to 'isolate' will turn the element into a stacking context. In SVG, it defines whether an element is isolated or not.",
			restrictions: ["enum"],
		},
		{
			name: "line-clamp",
			browsers: ["UXP4.5"],
			status: "experimental",
			syntax: "none | <integer>",
			relevance: 50,
			description:
        "The line-clamp property allows limiting the contents of a block container to the specified number of lines; remaining content is fragmented away and neither rendered nor measured. Optionally, it also allows inserting content into the last line box to indicate the continuity of truncated/interrupted content.",
		},
		{
			name: "line-height",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "normal",
					description:
            "Tells user agents to set the computed value to a 'reasonable' value based on the font size of the element.",
				},
			],
			syntax: "normal | <number> | <length> | <percentage>",
			relevance: 92,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/line-height",
				},
			],
			description:
        "Determines the block-progression dimension of the text content area of an inline box.",
			restrictions: ["number", "length", "percentage"],
		},
		{
			name: "object-fit",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "contain",
					description:
            "The replaced content is sized to maintain its aspect ratio while fitting within the element's content box: its concrete object size is resolved as a contain constraint against the element's used width and height.",
				},
				{
					name: "cover",
					description:
            "The replaced content is sized to maintain its aspect ratio while filling the element's entire content box: its concrete object size is resolved as a cover constraint against the element's used width and height.",
				},
				{
					name: "fill",
					description:
            "The replaced content is sized to fill the element's content box: the object's concrete object size is the element's used width and height.",
				},
				{
					name: "none",
					description:
            "The replaced content is not resized to fit inside the element's content box",
				},
				{
					name: "scale-down",
					description:
            "Size the content as if 'none' or 'contain' were specified, whichever would result in a smaller concrete object size.",
				},
			],
			syntax: "fill | contain | cover | none | scale-down",
			relevance: 70,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/object-fit",
				},
			],
			description:
        "Specifies how the contents of a replaced element should be scaled relative to the box established by its used height and width.",
			restrictions: ["enum"],
		},
		{
			name: "object-position",
			browsers: ["UXP3.0"],
			syntax: "<position>",
			relevance: 56,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/object-position",
				},
			],
			description:
        "Determines the alignment of the replaced element inside its box.",
			restrictions: ["position", "length", "percentage"],
		},
		{
			name: "order",
			browsers: ["UXP3.0"],
			syntax: "<integer>",
			relevance: 65,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/order",
				},
			],
			description:
        "Controls the order in which children of a flex container appear within the flex container, by assigning them to ordinal groups.",
			restrictions: ["integer"],
		},
		{
			name: "outline",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "auto",
					description:
            "Permits the user agent to render a custom outline style, typically the default platform style.",
				},
				{
					name: "invert",
					browsers: ["UXP3.0"],
					description:
            "Performs a color inversion on the pixels on the screen.",
				},
				...lineStyles,
				...namedColors,
			],
			syntax: "[ <'outline-color'> || <'outline-style'> || <'outline-width'> ]",
			relevance: 88,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/outline",
				},
			],
			description:
        "Shorthand property for 'outline-style', 'outline-width', and 'outline-color'.",
			restrictions: ["length", "line-width", "line-style", "color", "enum"],
		},
		{
			name: "outline-color",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "invert",
					browsers: ["UXP3.0"],
					description:
            "Performs a color inversion on the pixels on the screen.",
				},
				...namedColors,
			],
			syntax: "<color> | invert",
			relevance: 58,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/outline-color",
				},
			],
			description: "The color of the outline.",
			restrictions: ["enum", "color"],
		},
		{
			name: "outline-offset",
			browsers: ["UXP3.0"],
			syntax: "<length>",
			relevance: 70,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/outline-offset",
				},
			],
			description: "Offset the outline and draw it beyond the border edge.",
			restrictions: ["length"],
		},
		{
			name: "outline-style",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "auto",
					description:
            "Permits the user agent to render a custom outline style, typically the default platform style.",
				},
				...lineStyles,
			],
			syntax: "auto | <'border-style'>",
			relevance: 62,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/outline-style",
				},
			],
			description: "Style of the outline.",
			restrictions: ["line-style", "enum"],
		},
		{
			name: "outline-width",
			browsers: ["UXP3.0"],
			syntax: "<line-width>",
			relevance: 62,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/outline-width",
				},
			],
			description: "Width of the outline.",
			restrictions: ["length", "line-width"],
		},
		{
			name: "pointer-events",
			browsers: ["UXP7.2"],
			values: [
			/*
				{
					name: "all",
					description:
            "The given element can be the target element for pointer events whenever the pointer is over either the interior or the perimeter of the element.",
				},
				{
					name: "fill",
					description:
            "The given element can be the target element for pointer events whenever the pointer is over the interior of the element.",
				},
				*/
				{
					name: "none",
					description: "The given element does not receive pointer events.",
				},
				{
					name: "auto",
					description: "The element behaves as it would if the pointer-events property were not specified.",
				},
				/*
				{
					name: "painted",
					description:
            "The given element can be the target element for pointer events when the pointer is over a \"painted\" area. ",
				},
				{
					name: "stroke",
					description:
            "The given element can be the target element for pointer events whenever the pointer is over the perimeter of the element.",
				},
				{
					name: "visible",
					description:
            "The given element can be the target element for pointer events when the 'visibility' property is set to visible and the pointer is over either the interior or the perimeter of the element.",
				},
				{
					name: "visibleFill",
					description:
            "The given element can be the target element for pointer events when the 'visibility' property is set to visible and when the pointer is over the interior of the element.",
				},
				{
					name: "visiblePainted",
					description:
            "The given element can be the target element for pointer events when the 'visibility' property is set to visible and when the pointer is over a 'painted' area.",
				},
				{
					name: "visibleStroke",
					description:
            "The given element can be the target element for pointer events when the 'visibility' property is set to visible and when the pointer is over the perimeter of the element.",
				},
				*/
			],
			syntax: "auto | none",
			//syntax: "auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit",
			relevance: 82,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/pointer-events",
				},
			],
			description:
        "Specifies under what circumstances a given element can be the target element for a pointer event.",
			restrictions: ["enum"],
		},
		{
			name: "position",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "absolute",
					description:
            "The box's position (and possibly size) is specified with the 'top', 'right', 'bottom', and 'left' properties. These properties specify offsets with respect to the box's 'containing block'.",
				},
				{
					name: "fixed",
					description:
            "The box's position is calculated according to the 'absolute' model, but in addition, the box is fixed with respect to some reference. As with the 'absolute' model, the box's margins do not collapse with any other margins.",
				},
				{
					name: "-ms-page",
					browsers: ["UXP3.0"],
					description:
            "The box's position is calculated according to the 'absolute' model.",
				},
				{
					name: "relative",
					description:
            "The box's position is calculated according to the normal flow (this is called the position in normal flow). Then the box is offset relative to its normal position.",
				},
				{
					name: "static",
					description:
            "The box is a normal box, laid out according to the normal flow. The 'top', 'right', 'bottom', and 'left' properties do not apply.",
				},
				{
					name: "sticky",
					browsers: ["UXP3.0"],
					description:
            "The box's position is calculated according to the normal flow. Then the box is offset relative to its flow root and containing block and in all cases, including table elements, does not affect the position of any following boxes.",
				},
				{
					name: "-webkit-sticky",
					browsers: ["UXP3.0"],
					description:
            "The box's position is calculated according to the normal flow. Then the box is offset relative to its flow root and containing block and in all cases, including table elements, does not affect the position of any following boxes.",
				},
			],
			syntax: "static | relative | absolute | sticky | fixed",
			relevance: 96,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/position",
				},
			],
			description:
        "The position CSS property sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements.",
			restrictions: ["enum"],
		},
		{
			name: "stroke",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "url()",
					description:
            "A URL reference to a paint server element, which is an element that defines a paint server: 'hatch', 'linearGradient', 'mesh', 'pattern', 'radialGradient' and 'solidcolor'.",
				},
				{
					name: "none",
					description: "No paint is applied in this layer.",
				},
				...namedColors,
			],
			relevance: 67,
			description: "Paints along the outline of the given graphical element.",
			restrictions: ["color", "enum", "url"],
		},
		{
			name: "stroke-opacity",
			browsers: ["UXP3.0"],
			relevance: 51,
			description:
        "Specifies the opacity of the painting operation used to stroke the current object.",
			restrictions: ["number(0-1)"],
		},
		{
			name: "stroke-width",
			browsers: ["UXP3.0"],
			relevance: 63,
			description: "Specifies the width of the stroke on the current object.",
			restrictions: ["percentage", "length"],
		},
		{
			name: "table-layout",
			browsers: ["UXP5.6"],
			values: [
				{
					name: "auto",
					description: "Use any automatic table layout algorithm.",
				},
				{
					name: "fixed",
					description: "Use the fixed table layout algorithm.",
				},
			],
			syntax: "auto | fixed",
			relevance: 60,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/table-layout",
				},
			],
			description:
        "Controls the algorithm used to lay out the table cells, rows, and columns.",
			restrictions: ["enum"],
		},
		{
			name: "text-decoration",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "dashed",
					description: "Produces a dashed line style.",
				},
				{
					name: "dotted",
					description: "Produces a dotted line.",
				},
				{
					name: "double",
					description: "Produces a double line.",
				},
				{
					name: "line-through",
					description: "Each line of text has a line through the middle.",
				},
				{
					name: "none",
					description: "Produces no line.",
				},
				{
					name: "overline",
					description: "Each line of text has a line above it.",
				},
				{
					name: "solid",
					description: "Produces a solid line.",
				},
				{
					name: "underline",
					description: "Each line of text is underlined.",
				},
				{
					name: "wavy",
					description: "Produces a wavy line.",
				},
				...namedColors,
			],
			syntax:
        "<'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>",
			relevance: 91,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration",
				},
			],
			description: "Decorations applied to font used for an element's text.",
			restrictions: ["enum", "color"],
		},
		{
			name: "text-decoration-color",
			browsers: ["UXP3.0"],
			syntax: "<color>",
			relevance: 55,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-color",
				},
			],
			values: namedColors,
			description:
        "Specifies the color of text decoration (underlines overlines, and line-throughs) set on the element with text-decoration-line.",
			restrictions: ["color"],
		},
		{
			name: "text-decoration-line",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "line-through",
					description: "Each line of text has a line through the middle.",
				},
				{
					name: "none",
					description: "Neither produces nor inhibits text decoration.",
				},
				{
					name: "overline",
					description: "Each line of text has a line above it.",
				},
				{
					name: "underline",
					description: "Each line of text is underlined.",
				},
			],
			syntax:
        "none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error",
			relevance: 57,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-line",
				},
			],
			description:
        "Specifies what line decorations, if any, are added to the element.",
			restrictions: ["enum"],
		},
		{
			name: "text-decoration-style",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "dashed",
					description: "Produces a dashed line style.",
				},
				{
					name: "dotted",
					description: "Produces a dotted line.",
				},
				{
					name: "double",
					description: "Produces a double line.",
				},
				{
					name: "none",
					description: "Produces no line.",
				},
				{
					name: "solid",
					description: "Produces a solid line.",
				},
				{
					name: "wavy",
					description: "Produces a wavy line.",
				},
			],
			syntax: "solid | double | dotted | dashed | wavy",
			relevance: 51,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-style",
				},
			],
			description:
        "Specifies the line style for underline, line-through and overline text decoration.",
			restrictions: ["enum"],
		},
		{
			name: "touch-action",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "auto",
					description:
            "The user agent may determine any permitted touch behaviors for touches that begin on the element.",
				},
				{
					name: "cross-slide-x",
					browsers: ["UXP3.0"],
				},
				{
					name: "cross-slide-y",
					browsers: ["UXP3.0"],
				},
				{
					name: "double-tap-zoom",
					browsers: ["UXP3.0"],
				},
				{
					name: "manipulation",
					description:
            "The user agent may consider touches that begin on the element only for the purposes of scrolling and continuous zooming.",
				},
				{
					name: "none",
					description:
            "Touches that begin on the element must not trigger default touch behaviors.",
				},
				{
					name: "pan-x",
					description:
            "The user agent may consider touches that begin on the element only for the purposes of horizontally scrolling the element's nearest ancestor with horizontally scrollable content.",
				},
				{
					name: "pan-y",
					description:
            "The user agent may consider touches that begin on the element only for the purposes of vertically scrolling the element's nearest ancestor with vertically scrollable content.",
				},
				{
					name: "pinch-zoom",
					browsers: ["UXP3.0"],
				},
			],
			syntax:
        "auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation",
			relevance: 68,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/touch-action",
				},
			],
			description:
        "Determines whether touch input may trigger default behavior supplied by user agent.",
			restrictions: ["enum"],
		},
		{
			name: "transform",
			browsers: ["UXP3.0"],
			values: [
				// ! TODO - these are being checked in "uxpCustomData" in functionNames... not here
				/*
				{
					name: "matrix()",
					description: "Specifies a 2D transformation in the form of a transformation matrix of six values. matrix(a,b,c,d,e,f) is equivalent to applying the transformation matrix [a b c d e f]",
				},
				{
					name: "matrix3d()",
					description: "Specifies a 3D transformation as a 4x4 homogeneous matrix of 16 values in column-major order.",
				},
				{
					name: "perspective()",
					description: "Specifies a perspective projection matrix.",
				},
				{
					name: "rotate3d()",
					description: "Specifies a clockwise 3D rotation by the angle specified in last parameter about the [x,y,z] direction vector described by the first 3 parameters.",
				},
				{
					name: "rotateX('angle')",
					description: "Specifies a clockwise rotation by the given angle about the X axis.",
				},
				{
					name: "rotateY('angle')",
					description: "Specifies a clockwise rotation by the given angle about the Y axis.",
				},
				{
					name: "rotateZ('angle')",
					description: "Specifies a clockwise rotation by the given angle about the Z axis.",
				},
				{
					name: "scale3d()",
					description: "Specifies a 3D scale operation by the [sx,sy,sz] scaling vector described by the 3 parameters.",
				},
				{
					name: "scaleZ()",
					description: "Specifies a scale operation using the [1,1,sz] scaling vector, where sz is given as the parameter.",
				},
				{
					name: "skew()",
					description: "Specifies a skew transformation along the X and Y axes. The first angle parameter specifies the skew on the X axis. The second angle parameter specifies the skew on the Y axis. If the second parameter is not given then a value of 0 is used for the Y angle (ie: no skew on the Y axis).",
				},
				{
					name: "skewX()",
					description: "Specifies a skew transformation along the X axis by the given angle.",
				},
				{
					name: "skewY()",
					description: "Specifies a skew transformation along the Y axis by the given angle.",
				},
				{
					name: "translate3d()",
					description: "Specifies a 3D translation by the vector [tx,ty,tz], with tx, ty and tz being the first, second and third translation-value parameters respectively.",
				},
				{
					name: "translateZ()",
					description: "Specifies a translation by the given amount in the Z direction. Note that percentage values are not allowed in the translateZ translation-value, and if present are evaluated as 0.",
				},
				*/
				{
					name: "none",
				},
				{
					name: "rotate()",
					description: "Specifies a 2D rotation by the angle specified in the parameter about the origin of the element, as defined by the transform-origin property.",
				},
				{
					name: "scale()",
					description: "Specifies a 2D scale operation by the [sx,sy] scaling vector described by the 2 parameters. If the second parameter is not provided, it is takes a value equal to the first.",
				},
				{
					name: "scaleX()",
					description: "Specifies a scale operation using the [sx,1] scaling vector, where sx is given as the parameter.",
					browsers: ["UXP8.0"],
				},
				{
					name: "scaleY()",
					description: "Specifies a scale operation using the [sy,1] scaling vector, where sy is given as the parameter.",
					browsers: ["UXP8.0"],
				},
				{
					name: "translate()",
					description: "Specifies a 2D translation by the vector [tx, ty], where tx is the first translation-value parameter and ty is the optional second translation-value parameter.",
				},
				{
					name: "translateX()",
					description: "Specifies a translation by the given amount in the X direction.",
				},
				{
					name: "translateY()",
					description: "Specifies a translation by the given amount in the Y direction.",
				},
			],
			syntax: "none | <transform-list>",
			relevance: 90,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/transform",
				},
			],
			description: "A two-dimensional transformation is applied to an element through the 'transform' property. This property contains a list of transform functions similar to those allowed by SVG.",
			restrictions: ["enum"],
		},
		{
			name: "transform-origin",
			browsers: ["UXP8.0"],
			syntax: "[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?",
			relevance: 74,
			references: [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/transform-origin",
				},
			],
			description: "Establishes the origin of transformation for an element.",
			restrictions: [
				"position",
				"length",
				"percentage",
			],
		},
		{
			name: "translate",
			syntax: "none | <length-percentage> [ <length-percentage> <length>? ]?",
			relevance: 50,
			browsers: ["UXP8.0"],
			references: [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/translate",
				},
			],
			description: "The translate CSS property allows you to specify translation transforms individually and independently of the transform property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the transform value.",
		},
		{
			name: "vertical-align",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "auto",
					description:
            "Align the dominant baseline of the parent box with the equivalent, or heuristically reconstructed, baseline of the element inline box.",
				},
				{
					name: "baseline",
					description:
            "Align the 'alphabetic' baseline of the element with the 'alphabetic' baseline of the parent element.",
				},
				{
					name: "bottom",
					description:
            "Align the after edge of the extended inline box with the after-edge of the line box.",
				},
				{
					name: "middle",
					description:
            "Align the 'middle' baseline of the inline element with the middle baseline of the parent.",
				},
				{
					name: "sub",
					description:
            "Lower the baseline of the box to the proper position for subscripts of the parent's box. (This value has no effect on the font size of the element's text.)",
				},
				{
					name: "super",
					description:
            "Raise the baseline of the box to the proper position for superscripts of the parent's box. (This value has no effect on the font size of the element's text.)",
				},
				{
					name: "text-bottom",
					description:
            "Align the bottom of the box with the after-edge of the parent element's font.",
				},
				{
					name: "text-top",
					description:
            "Align the top of the box with the before-edge of the parent element's font.",
				},
				{
					name: "top",
					description:
            "Align the before edge of the extended inline box with the before-edge of the line box.",
				},
				{
					name: "-webkit-baseline-middle",
					browsers: ["UXP3.0"],
				},
			],
			syntax:
        "baseline | sub | super | text-top | text-bottom | middle | top | bottom | <percentage> | <length>",
			relevance: 91,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/vertical-align",
				},
			],
			description:
        "Affects the vertical positioning of the inline boxes generated by an inline-level element inside a line box.",
			restrictions: ["percentage", "length"],
		},
		{
			name: "word-break",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "break-all",
					description:
            "Lines may break between any two grapheme clusters for non-CJK scripts.",
				},
				{
					name: "keep-all",
					description:
            "Block characters can no longer create implied break points.",
				},
				{
					name: "normal",
					description: "Breaks non-CJK scripts according to their own rules.",
				},
			],
			syntax: "normal | break-all | keep-all | break-word",
			relevance: 76,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/word-break",
				},
			],
			description: "Specifies line break opportunities for non-CJK scripts.",
			restrictions: ["enum"],
		},
		{
			name: "writing-mode",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "horizontal-tb",
					description:
            "Top-to-bottom block flow direction. The writing mode is horizontal.",
				},
				{
					name: "sideways-lr",
					browsers: ["UXP3.0"],
					description:
            "Left-to-right block flow direction. The writing mode is vertical, while the typographic mode is horizontal.",
				},
				{
					name: "sideways-rl",
					browsers: ["UXP3.0"],
					description:
            "Right-to-left block flow direction. The writing mode is vertical, while the typographic mode is horizontal.",
				},
				{
					name: "vertical-lr",
					description:
            "Left-to-right block flow direction. The writing mode is vertical.",
				},
				{
					name: "vertical-rl",
					description:
            "Right-to-left block flow direction. The writing mode is vertical.",
				},
			],
			syntax:
        "horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr",
			relevance: 50,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/writing-mode",
				},
			],
			description:
        "This is a shorthand property for both 'direction' and 'block-progression'.",
			restrictions: ["enum"],
		},
		{
			name: "z-index",
			browsers: ["UXP3.0"],
			values: [
				{
					name: "auto",
					description:
            "The stack level of the generated box in the current stacking context is 0. The box does not establish a new stacking context unless it is the root element.",
				},
			],
			syntax: "auto | <integer>",
			relevance: 92,
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/z-index",
				},
			],
			description:
        "For a positioned box, the 'z-index' property specifies the stack level of the box in the current stacking context and whether the box establishes a local stacking context.",
			restrictions: ["integer"],
		},
		{
			"name": "box-shadow",
			"browsers": ["UXP7.3"], // ! Might need SWC feature flag.
			"values": [
				/*
				{
					"name": "inset",
					"description": "Changes the drop shadow from an outer shadow (one that shadows the box onto the canvas, as if it were lifted above the canvas) to an inner shadow (one that shadows the canvas onto the box, as if the box were cut out of the canvas and shifted behind it).",
				},
				*/
				{
					"name": "none",
					"description": "No shadow.",
				},
				...namedColors,
			],
			"syntax": "none | <shadow>#",
			"relevance": 89,
			"references": [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/box-shadow",
				},
			],
			"description": "Attaches one or more drop-shadows to the box. The property is a comma-separated list of shadows, each specified by 2-4 length values, an optional color, and an optional 'inset' keyword. Omitted lengths are 0; omitted colors are a user agent chosen color.",
			"restrictions": [
				"length",
				"color",
				"enum",
			],
		},
	],
	atDirectives: [
		{
			name: "@media",
			browsers: ["UXP4.1"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/@media",
				},
			],
			description: "Defines a stylesheet for a particular media type.",
		},
		/*
		"@charset",
		"@color-profile",
		"@container",
		"@counter-style",
		"@documentNon-standardDeprecated",
		"@font-face",
		"@font-feature-values",
		"@font-palette-values",
		"@import",
		"@keyframes",
		"@layer",
		"@namespace",
		"@page",
		"@property",
		"@support",
		*/
	],
	pseudoClasses: [
		{
			name: "active",
			browsers: ["UXP3.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/:active",
				},
			],
			description:
				"Applies while an element is being activated by the user. For example, between the times the user presses the mouse button and releases it.",
		},
		{
			name: "checked",
			browsers: ["UXP3.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/:checked",
				},
			],
			description:
				"Radio and checkbox elements can be toggled by the user. Some menu items are 'checked' when the user selects them. When such elements are toggled 'on' the :checked pseudo-class applies.",
		},
		{
			name: "disabled",
			browsers: ["UXP3.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/:disabled",
				},
			],
			description:
				"Represents user interface elements that are in a disabled state; such elements have a corresponding enabled state.",
		},
		{
			name: "empty",
			browsers: ["UXP3.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/:empty",
				},
			],
			description: "Represents an element that has no children at all.",
		},
		{
			name: "enabled",
			browsers: ["UXP3.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/:enabled",
				},
			],
			description:
				"Represents user interface elements that are in an enabled state; such elements have a corresponding disabled state.",
		},
		{
			name: "first-child",
			browsers: ["UXP3.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/:first-child",
				},
			],
			description:
				"Same as :nth-child(1). Represents an element that is the first child of some other element.",
		},
		{
			name: "focus",
			browsers: ["UXP3.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/:focus",
				},
			],
			description:
				"Applies while an element has the focus (accepts keyboard or mouse events, or other forms of input).",
		},
		{
			name: "hover",
			browsers: ["UXP3.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/:hover",
				},
			],
			description:
				"Applies while the user designates an element with a pointing device, but does not necessarily activate it. For example, a visual user agent could apply this pseudo-class when the cursor (mouse pointer) hovers over a box generated by the element.",
		},
		{
			name: "last-child",
			browsers: ["UXP3.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/:last-child",
				},
			],
			description:
				"Same as :nth-last-child(1). Represents an element that is the last child of some other element.",
		},
		{
			name: "nth-child",
			browsers: ["UXP3.0"],
			description:
				"Represents an element that has an+b-1 siblings before it in the document tree, for any positive integer or zero value of n, and has a parent element.",
		},
		{
			name: "nth-last-child",
			browsers: ["UXP3.0"],
			description:
				"Represents an element that has an+b-1 siblings after it in the document tree, for any positive integer or zero value of n, and has a parent element.",
		},
		{
			name: "nth-last-of-type",
			browsers: ["UXP3.0"],
			description:
				"Represents an element that has an+b-1 siblings with the same expanded element name after it in the document tree, for any zero or positive integer value of n, and has a parent element.",
		},
		{
			name: "nth-of-type",
			browsers: ["UXP3.0"],
			description:
				"Represents an element that has an+b-1 siblings with the same expanded element name before it in the document tree, for any zero or positive integer value of n, and has a parent element.",
		},
		{
			name: "only-child",
			browsers: ["UXP3.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/:only-child",
				},
			],
			description:
				"Represents an element that has a parent element and whose parent element has no other element children. Same as :first-child:last-child or :nth-child(1):nth-last-child(1), but with a lower specificity.",
		},
		{
			name: "root",
			browsers: ["UXP3.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/:root",
				},
			],
			description:
				"Represents an element that is the root of the document. In HTML 4, this is always the HTML element.",
		},
		{
			name: "not",
			browsers: ["UXP4.3.2"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/:not",
				},
			],
			description:
				"The negation pseudo-class, :not(X), is a functional notation taking a simple selector (excluding the negation pseudo-class itself) as an argument. It represents an element that is not represented by its argument.",
		},
		{
			name: "defined",
			browsers: ["UXP6.0"],
			references: [
				{
					"name": "MDN Reference",
					"url": "https://developer.mozilla.org/docs/Web/CSS/:defined",
				},
			],
			description: "The :defined CSS pseudo-class represents any element that has been defined. This includes any standard element built in to the browser, and custom elements that have been successfully defined (i.e. with the CustomElementRegistry.define() method).",
		},
		// all pseudo classes
		/*
		":any-link",
		":autofill",
		":blank",
		":current",
		":default",
		":defined",
		":dir()",
		":first",
		":first-of-type",
		":fullscreen",
		":future",
		":focus-visible",
		":focus-within",
		":has()",
		":host",
		":host()",
		":host-context()",
		":indeterminate",
		":in-range",
		":invalid",
		":is()",
		":lang()",
		":last-of-type",
		":left",
		":link",
		":local-link",
		":modal",
		":nth-col()",
		":nth-last-col()",
		":only-of-type",
		":optional",
		":out-of-range",
		":past",
		":picture-in-picture",
		":placeholder-shown",
		":paused",
		":playing",
		":read-only",
		":read-write",
		":required",
		":right",
		":scope",
		":state()",
		":target",
		":target-within",
		":user-invalid",
		":valid",
		":visited",
		":where()",
		*/
	],
	pseudoElements: [
		{
			name: "after",
			browsers: ["UXP3.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/::after",
				},
			],
			description:
				"Represents a styleable child pseudo-element immediately after the originating element's actual content.",
		},
		{
			name: "before",
			browsers: ["UXP3.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/::before",
				},
			],
			description:
				"Represents a styleable child pseudo-element immediately before the originating element's actual content.",
		},
		{
			name: "slotted",
			browsers: ["UXP7.0"],
			references: [
				{
					name: "MDN Reference",
					url: "https://developer.mozilla.org/docs/Web/CSS/::slotted",
				},
			],
			description:
        "The :slotted() CSS pseudo-element represents any element that has been placed into a slot inside an HTML template.",
		},
		/*
		"::backdrop",
		"::cue",
		"::cue-region",
		"::first-letter",
		"::first-line",
		"::file-selector-button",
		"::grammar-error",
		"::marker",
		"::part()",
		"::placeholder",
		"::selection",
		"::spelling-error",
		"::target-text",
		*/
	],
	mediaFeatures: [
		{
			name: "height",
			browsers: ["UXP4.1"],
		},
		{
			name: "min-height",
			browsers: ["UXP4.1"],
		},
		{
			name: "max-height",
			browsers: ["UXP4.1"],
		},
		{
			name: "width",
			browsers: ["UXP4.1"],
		},
		{
			name: "min-width",
			browsers: ["UXP4.1"],
		},
		{
			name: "max-width",
			browsers: ["UXP4.1"],
		},
		{
			name: "prefers-color-scheme",
			browsers: ["UXP4.1"],
		},
		/* media features */
		/*
		any-hover
		any-pointer
		aspect-ratio
		color
		color-gamut
		color-index
		device-aspect-ratio
		device-height
		device-width
		display-mode
		dynamic-range
		forced-colors
		grid
		hover
		inverted-colors
		monochrome
		orientation
		overflow-block
		overflow-inline
		pointer
		prefers-contrast
		prefers-reduced-motion
		resolution
		scripting
		update
		video-dynamic-range
		*/
	],
	units: [
		{
			name: "em",
			browsers: ["UXP3.0"],
		},
		// ! This is wrongly implemented in UXP. Support disabled until fixed.
		// See https://github.com/jardicc/vscode-uxp-validator/issues/1
		/*
		{
			name: "rem",
			browsers: ["UXP3.0"],
		},
		*/
		{
			name: "vh",
			browsers: ["UXP3.0"],
		},
		{
			name: "vw",
			browsers: ["UXP3.0"],
		},
		{
			name: "vmin",
			browsers: ["UXP3.0"],
		},
		{
			name: "vmax",
			browsers: ["UXP3.0"],
		},
		{
			name: "cm",
			browsers: ["UXP3.0"],
		},
		{
			name: "mm",
			browsers: ["UXP3.0"],
		},
		{
			name: "in",
			browsers: ["UXP3.0"],
		},
		{
			name: "pc",
			browsers: ["UXP3.0"],
		},
		{
			name: "pt",
			browsers: ["UXP3.0"],
		},
		{
			name: "px",
			browsers: ["UXP3.0"],
		},
		{
			name: "%",
			browsers: ["UXP3.0"],
		},
		{
			name: "deg",
			browsers: ["UXP3.0"],
		},
		{
			name: "grad",
			browsers: ["UXP3.0"],
		},
		{
			name: "rad",
			browsers: ["UXP3.0"],
		},
		{
			name: "turn",
			browsers: ["UXP3.0"],
		},
		/*
			cqw
			cqh
			cqi
			cqb
			cqmin
			cqmax
			Q
			s
			ms
			Hz
			kHz
			fr
			dpi
			dpcm
			dppx, x
		*/
	],
	functionNames: [
		{
			name: "calc",
			browsers: ["UXP3.0"],
		},
		{
			name: "var",
			browsers: ["UXP3.0"],
		},
		{
			name: "rgb",
			browsers: ["UXP2.0"],
		},
		{
			name: "rgba",
			browsers: ["UXP2.0"],
		},
		{
			name: "hsl",
			browsers: ["UXP2.0"],
		},
		{
			name: "hsla",
			browsers: ["UXP2.0"],
		},
		{
			name: "linear-gradient",
			browsers: ["UXP3.0"],
		},
		{
			name: "radial-gradient",
			browsers: ["UXP3.0"],
		},

		{
			name: "scale",
			browsers: ["UXP8.0"], // ? It could been added in UXP 7.3 But it has no documentation. And I am not detective but programmer to waste time with finding out.
		},
		{
			name: "rotate",
			browsers: ["UXP8.0"], // ? It could been added in UXP 7.3 But it has no documentation. And I am not detective but programmer to waste time with finding out.
		},
		{
			name: "scaleX",
			browsers: ["UXP8.0"],
		},
		{
			name: "scaleY",
			browsers: ["UXP8.0"],
		},
		{
			name: "translate",
			browsers: ["UXP3.0"],
		},
		{
			name: "translateX",
			browsers: ["UXP3.0"],
		},
		{
			name: "translateY",
			browsers: ["UXP3.0"],
		},
		{
			name: "url",
			browsers: ["UXP2.0"],
		},

		// ! TODO rotate and others might need feature flags

		/* other functions
		attr()
		repeating-linear-gradient()
		repeating-radial-gradient()
		repeating-conic-gradient()
		conic-gradient()
		translateZ()
		translate3d()
		rotateX()
		rotateY()
		rotateZ()
		rotate3d()
		scaleZ()
		scale()
		scale3d()
		skewX()
		skewY()
		skew()
		matrix()
		matrix3d()
		perspective()
		min()
		max()
		clamp()
		round()
		mod()
		rem()
		sin()
		cos()
		tan()
		asin()
		acos()
		atan()
		atan2()
		pow()
		sqrt()
		hypot()
		log()
		exp()
		abs()
		sign()
		blur()
		brightness()
		contrast()
		drop-shadow()
		grayscale()
		hue-rotate()
		invert()
		opacity()
		saturate()
		sepia()
		hwb()
		lch()
		oklch()
		lab()
		oklab()
		color()
		color-mix()
		color-contrast()
		device-cmyk()
		image()
		image-set()
		cross-fade()
		element()
		paint()
		counter()
		counters()
		symbols()
		circle()
		ellipse()
		inset()
		polygon()
		path()

		env()
		fit-content()
		minmax()
		repeat()
		stylistic()
		styleset()
		character-variant()
		swash()
		ornaments()
		annotation()
		cubic-bezier()
		steps()
		*/
	],
};

export const allKnownFunctionNames: string[] = [
	"translateX",
	"translateY",
	"translateZ",
	"translate",
	"translate3d",
	"rotateX",
	"rotateY",
	"rotateZ",
	"rotate",
	"rotate3d",
	"scaleX",
	"scaleY",
	"scaleZ",
	"scale",
	"scale3d",
	"skewX",
	"skewY",
	"skew",
	"matrix",
	"matrix3d",
	"perspective",
	"calc",
	"min",
	"max",
	"clamp",
	"round",
	"mod",
	"rem",
	"sin",
	"cos",
	"tan",
	"asin",
	"acos",
	"atan",
	"atan2",
	"pow",
	"sqrt",
	"hypot",
	"log",
	"exp",
	"abs",
	"sign",
	"blur",
	"brightness",
	"contrast",
	"drop-shadow",
	"grayscale",
	"hue-rotate",
	"invert",
	"opacity",
	"saturate",
	"sepia",
	"rgb",
	"hsl",
	"hwb",
	"lch",
	"oklch",
	"lab",
	"oklab",
	"color",
	"color-mix",
	"color-contrast",
	"device-cmyk",
	"light-dark",
	"linear-gradient",
	"radial-gradient",
	"conic-gradient",
	"repeating-linear-gradient",
	"repeating-radial-gradient",
	"repeating-conic-gradient",
	"image",
	"image-set",
	"cross-fade",
	"element",
	"paint",
	"counter",
	"counters",
	"symbols",
	"circle",
	"ellipse",
	"inset",
	"rect",
	"xywh",
	"polygon",
	"path",
	"shape",
	"attr",
	"env",
	"var",
	"fit-content",
	"minmax",
	"repeat",
	"stylistic",
	"styleset",
	"character-variant",
	"swash",
	"ornaments",
	"annotation",
	"linear",
	"cubic-bezier",
	"steps",
	"scroll",
	"view",
	"anchor",
	"anchor-size",
	"url",
];

/*

// TODO media types
/*
all
print
screen
*/

// TODO supported selectors

// TODO global values
/*
inherit
initial
revert
revert-layer
unset


TO VERIFY THESE

appearance
background-blend-mode
background-clip
background-origin
background-position-x
background-position-y
border-collapse
border-spacing
border-top-right-radius
color-profile
content
cursor
fill
fill-opacity
flex-flow
isolation
line-clamp
line-height
object-fit
object-position
order
outline
outline-color
outline-offset
outline-radius
outline-style
outline-width
pointer-events
position
stroke
stroke-opacity
stroke-width
table-layout
text-decoration
text-decoration-color
text-decoration-line
text-decoration-style
text-ellipsis
touch-action
transform
vertical-align
word-break
writing-mode
z-index


*/
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";

import {IPropertyData, IValueData} from "../../CssServiceOriginal/cssLanguageTypes";

export const positionKeywords: { [name: string]: string } = {
	bottom:
    "Computes to ‘100%’ for the vertical position if one or two values are given, otherwise specifies the bottom edge as the origin for the next offset.",
	center:
    "Computes to ‘50%’ (‘left 50%’) for the horizontal position if the horizontal position is not otherwise specified, or ‘50%’ (‘top 50%’) for the vertical position if it is.",
	left: "Computes to ‘0%’ for the horizontal position if one or two values are given, otherwise specifies the left edge as the origin for the next offset.",
	right:
    "Computes to ‘100%’ for the horizontal position if one or two values are given, otherwise specifies the right edge as the origin for the next offset.",
	top: "Computes to ‘0%’ for the vertical position if one or two values are given, otherwise specifies the top edge as the origin for the next offset.",
};

export const repeatStyleKeywords: { [name: string]: string } = {
	"no-repeat": "Placed once and not repeated in this direction.",
	repeat:
    "Repeated in this direction as often as needed to cover the background painting area.",
	"repeat-x": "Computes to ‘repeat no-repeat’.",
	"repeat-y": "Computes to ‘no-repeat repeat’.",
	round:
    "Repeated as often as will fit within the background positioning area. If it doesn’t fit a whole number of times, it is rescaled so that it does.",
	space:
    "Repeated as often as will fit within the background positioning area without being clipped and then the images are spaced out to fill the area.",
};

export const lineStyleKeywords: { [name: string]: string } = {
	dashed: "A series of square-ended dashes.",
	none: "No border. Color and width are ignored.",
	solid: "A single line segment.",
};

export const lineWidthKeywords = ["medium", "thick", "thin"];

export const boxKeywords: { [name: string]: string } = {
	"border-box": "The background is painted within (clipped to) the border box.",
	"content-box":
    "The background is painted within (clipped to) the content box.",
	"padding-box":
    "The background is painted within (clipped to) the padding box.",
};

export const geometryBoxKeywords: { [name: string]: string } = {
	"margin-box": "Uses the margin box as reference box.",
	"fill-box": "Uses the object bounding box as reference box.",
	"stroke-box": "Uses the stroke bounding box as reference box.",
	"view-box": "Uses the nearest SVG viewport as reference box.",
};

export const cssWideKeywords: { [name: string]: string } = {
	initial: "Represents the value specified as the property’s initial value.",
	inherit:
    "Represents the computed value of the property on the element’s parent.",
	unset:
    "Acts as either `inherit` or `initial`, depending on whether the property is inherited or not.",
};

export const cssWideFunctions: { [name: string]: string } = {
	"var()": "Evaluates the value of a custom variable.",
	"calc()":
    "Evaluates an mathematical expression. The following operators can be used: + - * /.",
};

export const imageFunctions: {[name: string]: string} = {
	"url()": "Reference an image file by URL",
	"image()": "Provide image fallbacks and annotations.",
	"image-set()": "Provide multiple resolutions of an image and const the UA decide which is most appropriate in a given situation.",
	"element()": "Use an element in the document as an image.",
	"cross-fade()": "Indicates the two images to be combined and how far along in the transition the combination is.",
	"linear-gradient()": "A linear gradient is created by specifying a straight gradient line, and then several colors placed along that line.",
	"repeating-linear-gradient()": "Same as linear-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position.",
	"radial-gradient()": "Colors emerge from a single point and smoothly spread outward in a circular or elliptical shape.",
	"repeating-radial-gradient()": "Same as radial-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position.",
};

export const units: { [unitName: string]: string[] } = {
	length: [
		"cap",
		"ch",
		"cm",
		"cqb",
		"cqh",
		"cqi",
		"cqmax",
		"cqmin",
		"cqw",
		"dvb",
		"dvh",
		"dvi",
		"dvw",
		"em",
		"ex",
		"ic",
		"in",
		"lh",
		"lvb",
		"lvh",
		"lvi",
		"lvw",
		"mm",
		"pc",
		"pt",
		"px",
		"q",
		"rcap",
		"rch",
		"rem",
		"rex",
		"ric",
		"rlh",
		"svb",
		"svh",
		"svi",
		"svw",
		"vb",
		"vh",
		"vi",
		"vmax",
		"vmin",
		"vw",
	],
	angle: ["deg", "rad", "grad", "turn"],
	time: ["ms", "s"],
	frequency: ["Hz", "kHz"],
	resolution: ["dpi", "dpcm", "dppx"],
	percentage: ["%", "fr"],
};

export const html5Tags = [
	"a",
	"abbr",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"base",
	"bdi",
	"bdo",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"cite",
	"code",
	"col",
	"colgroup",
	"data",
	"datalist",
	"dd",
	"del",
	"details",
	"dfn",
	"dialog",
	"div",
	"dl",
	"dt",
	"em",
	"embed",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hgroup",
	"hr",
	"html",
	"i",
	"iframe",
	"img",
	"input",
	"ins",
	"kbd",
	"keygen",
	"label",
	"legend",
	"li",
	"link",
	"main",
	"map",
	"mark",
	"menu",
	"menuitem",
	"meta",
	"meter",
	"nav",
	"noscript",
	"object",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"param",
	"picture",
	"pre",
	"progress",
	"q",
	"rb",
	"rp",
	"rt",
	"rtc",
	"ruby",
	"s",
	"samp",
	"script",
	"section",
	"select",
	"small",
	"source",
	"span",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"template",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"title",
	"tr",
	"track",
	"u",
	"ul",
	"const",
	"video",
	"wbr",
];

export const svgElements = [
	"circle",
	"clipPath",
	"cursor",
	"defs",
	"desc",
	"ellipse",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"filter",
	"foreignObject",
	"g",
	"hatch",
	"hatchpath",
	"image",
	"line",
	"linearGradient",
	"marker",
	"mask",
	"mesh",
	"meshpatch",
	"meshrow",
	"metadata",
	"mpath",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"radialGradient",
	"rect",
	"set",
	"solidcolor",
	"stop",
	"svg",
	"switch",
	"symbol",
	"text",
	"textPath",
	"tspan",
	"use",
	"view",
];

export const pageBoxDirectives = [
	"@bottom-center",
	"@bottom-left",
	"@bottom-left-corner",
	"@bottom-right",
	"@bottom-right-corner",
	"@left-bottom",
	"@left-middle",
	"@left-top",
	"@right-bottom",
	"@right-middle",
	"@right-top",
	"@top-center",
	"@top-left",
	"@top-left-corner",
	"@top-right",
	"@top-right-corner",
];

export const lineStyles: IValueData[] = [
	{
		name: "none",
		description: "No border. Color and width are ignored.",
	},
	{
		name: "solid",
		description: "A single line segment.",
	},
	{
		name: "dashed",
		description: "A series of square-ended dashes.",
	},
];

export const namedColors: IValueData[] = [
	{
		name: "transparent",
	},
	{
		name: "aliceblue",
	},
	{
		name: "antiquewhite",
	},
	{
		name: "aqua",
	},
	{
		name: "aquamarine",
	},
	{
		name: "azure",
	},
	{
		name: "beige",
	},
	{
		name: "bisque",
	},
	{
		name: "black",
	},
	{
		name: "blanchedalmond",
	},
	{
		name: "blue",
	},
	{
		name: "blueviolet",
	},
	{
		name: "brown",
	},
	{
		name: "burlywood",
	},
	{
		name: "cadetblue",
	},
	{
		name: "chartreuse",
	},
	{
		name: "chocolate",
	},
	{
		name: "coral",
	},
	{
		name: "cornflowerblue",
	},
	{
		name: "cornsilk",
	},
	{
		name: "crimson",
	},
	{
		name: "cyan",
	},
	{
		name: "darkblue",
	},
	{
		name: "darkcyan",
	},
	{
		name: "darkgoldenrod",
	},
	{
		name: "darkgray",
	},
	{
		name: "darkgrey",
	},
	{
		name: "darkgreen",
	},
	{
		name: "darkkhaki",
	},
	{
		name: "darkmagenta",
	},
	{
		name: "darkolivegreen",
	},
	{
		name: "darkorange",
	},
	{
		name: "darkorchid",
	},
	{
		name: "darkred",
	},
	{
		name: "darksalmon",
	},
	{
		name: "darkseagreen",
	},
	{
		name: "darkslateblue",
	},
	{
		name: "darkslategray",
	},
	{
		name: "darkslategrey",
	},
	{
		name: "darkturquoise",
	},
	{
		name: "darkviolet",
	},
	{
		name: "deeppink",
	},
	{
		name: "deepskyblue",
	},
	{
		name: "dimgray",
	},
	{
		name: "dimgrey",
	},
	{
		name: "dodgerblue",
	},
	{
		name: "firebrick",
	},
	{
		name: "floralwhite",
	},
	{
		name: "forestgreen",
	},
	{
		name: "fuchsia",
	},
	{
		name: "gainsboro",
	},
	{
		name: "ghostwhite",
	},
	{
		name: "gold",
	},
	{
		name: "goldenrod",
	},
	{
		name: "gray",
	},
	{
		name: "grey",
	},
	{
		name: "green",
	},
	{
		name: "greenyellow",
	},
	{
		name: "honeydew",
	},
	{
		name: "hotpink",
	},
	{
		name: "indianred",
	},
	{
		name: "indigo",
	},
	{
		name: "ivory",
	},
	{
		name: "khaki",
	},
	{
		name: "lavender",
	},
	{
		name: "lavenderblush",
	},
	{
		name: "lawngreen",
	},
	{
		name: "lemonchiffon",
	},
	{
		name: "lightblue",
	},
	{
		name: "lightcoral",
	},
	{
		name: "lightcyan",
	},
	{
		name: "lightgoldenrodyellow",
	},
	{
		name: "lightgray",
	},
	{
		name: "lightgrey",
	},
	{
		name: "lightgreen",
	},
	{
		name: "lightpink",
	},
	{
		name: "lightsalmon",
	},
	{
		name: "lightseagreen",
	},
	{
		name: "lightskyblue",
	},
	{
		name: "lightslategray",
	},
	{
		name: "lightslategrey",
	},
	{
		name: "lightsteelblue",
	},
	{
		name: "lightyellow",
	},
	{
		name: "lime",
	},
	{
		name: "limegreen",
	},
	{
		name: "linen",
	},
	{
		name: "magenta",
	},
	{
		name: "maroon",
	},
	{
		name: "mediumaquamarine",
	},
	{
		name: "mediumblue",
	},
	{
		name: "mediumorchid",
	},
	{
		name: "mediumpurple",
	},
	{
		name: "mediumseagreen",
	},
	{
		name: "mediumslateblue",
	},
	{
		name: "mediumspringgreen",
	},
	{
		name: "mediumturquoise",
	},
	{
		name: "mediumvioletred",
	},
	{
		name: "midnightblue",
	},
	{
		name: "mintcream",
	},
	{
		name: "mistyrose",
	},
	{
		name: "moccasin",
	},
	{
		name: "navajowhite",
	},
	{
		name: "navy",
	},
	{
		name: "oldlace",
	},
	{
		name: "olive",
	},
	{
		name: "olivedrab",
	},
	{
		name: "orange",
	},
	{
		name: "orangered",
	},
	{
		name: "orchid",
	},
	{
		name: "palegoldenrod",
	},
	{
		name: "palegreen",
	},
	{
		name: "paleturquoise",
	},
	{
		name: "palevioletred",
	},
	{
		name: "papayawhip",
	},
	{
		name: "peachpuff",
	},
	{
		name: "peru",
	},
	{
		name: "pink",
	},
	{
		name: "plum",
	},
	{
		name: "powderblue",
	},
	{
		name: "purple",
	},
	{
		name: "red",
	},
	{
		name: "rebeccapurple",
	},
	{
		name: "rosybrown",
	},
	{
		name: "royalblue",
	},
	{
		name: "saddlebrown",
	},
	{
		name: "salmon",
	},
	{
		name: "sandybrown",
	},
	{
		name: "seagreen",
	},
	{
		name: "seashell",
	},
	{
		name: "sienna",
	},
	{
		name: "silver",
	},
	{
		name: "skyblue",
	},
	{
		name: "slateblue",
	},
	{
		name: "slategray",
	},
	{
		name: "slategrey",
	},
	{
		name: "snow",
	},
	{
		name: "springgreen",
	},
	{
		name: "steelblue",
	},
	{
		name: "tan",
	},
	{
		name: "teal",
	},
	{
		name: "thistle",
	},
	{
		name: "tomato",
	},
	{
		name: "turquoise",
	},
	{
		name: "violet",
	},
	{
		name: "wheat",
	},
	{
		name: "white",
	},
	{
		name: "whitesmoke",
	},
	{
		name: "yellow",
	},
	{
		name: "yellowgreen",
	},
];
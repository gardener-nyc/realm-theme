const reduce = require('lodash/reduce');

//
// === Project Config ===
//
const COLORS = {
	black: '#000',
	white: '#fff',

	'off-white': '#FFFAEF',
	'gray-light': '#F3EEE5',
	'gray-medium': '#E0D9CA',

	green: '#A4B79F',
	brown: '#636154',
	highlight: '#D8F8B3',

	violet: '#CAC0DB',
	rust: '#70251B',
};

const SPACING = {
	'container-mobile': '20px',
	'container-desktop': '20px',
	'gutter-mobile': '15px',
	'gutter-desktop': '15px',
};

const FONT_FAMILIES = {
	serif: ['BB Modern', 'serif'],

	sans: [
		'FT Polar',
		'Helvetica Neue LT Std',
		'-apple-system',
		'BlinkMacSystemFont',
		'Helvetica Neue',
		'Helvetica',
		'sans-serif',
	],
};

const GRID_COLUMNS = 12;
const GRID_MAX_WIDTH = 1600;

const MAX_SPACER = 100;
const MAX_Z_INDEX = 100;

//
// === Generate Config file ===
//

const generateValues = (max, factor = 1, unit = 'px') =>
	new Array(max)
		.fill()
		.map((_, i) => i)
		.reduce((acc, val) => {
			acc[val] = `${val * factor}${unit}`;
			return acc;
		}, {});

const theme = {
	screens: {
		xs: '400px',
		sm: '600px',
		md: '800px',
		lg: '1000px',
		xl: '1200px',
		'2xl': '1400px',
		'3xl': '1600px',

		// Overrides
		100: '100px',
		200: '200px',
		300: '300px',
		400: '400px',
		500: '500px',
		600: '600px',
		700: '700px',
		800: '800px',
		900: '900px',
		1000: '1000px',
		1100: '1100px',
		1200: '1200px',
		1300: '1300px',
		1400: '1400px',
		1500: '1500px',
		1600: '1600px',
	},
	colors: ({colors}) => ({
		inherit: colors.inherit,
		current: colors.current,
		transparent: colors.transparent,
		...COLORS,
	}),
	columns: {
		auto: 'auto',
		...generateValues(GRID_COLUMNS, 1, ''),
	},
	spacing: {
		px: '1px',
		half: '5px',
		...generateValues(MAX_SPACER, 10),
		...SPACING,
	},
	borderColor: ({theme}) => ({
		...theme('colors'),
		DEFAULT: 'currentColor',
	}),
	borderRadius: {
		0: '0px',
		10: '10px',
		20: '20px',
		full: '100%',
		...generateValues(100),
	},
	fontFamily: FONT_FAMILIES,
	fontSize: {
		...generateValues(200),
	},
	lineHeight: {
		...generateValues(200),
	},
	fontWeight: {
		100: 100,
		200: 200,
		300: 300,
		400: 400,
		500: 500,
		600: 600,
		700: 700,
		800: 800,
		900: 900,
	},
	letterSpacing: {
		tighter: '-0.03em',
		tight: '-0.02em',
		normal: '0',
		wide: '0.04em',
	},
	maxWidth: {
		...generateValues(MAX_SPACER, 10),
		grid: `${GRID_MAX_WIDTH}px`,
	},
	transitionTimingFunction: {
		DEFAULT: 'cubic-bezier(0.16, 1, 0.3, 1)',
		appear: 'cubic-bezier(0.16, 1, 0.3, 1)',
		'in-quad': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
		'in-cubic': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
		'in-quart': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
		'in-quint': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
		'in-sine': 'cubic-bezier(0.47, 0, 0.745, 0.715)',
		'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
		'in-circ': 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
		'in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
		'out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
		'out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
		'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
		'out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
		'out-sine': 'cubic-bezier(0.39, 0.575, 0.565, 1)',
		'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
		'out-circ': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
		'out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
		'in-out-quad': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
		'in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
		'in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',
		'in-out-quint': 'cubic-bezier(0.86, 0, 0.07, 1)',
		'in-out-sine': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
		'in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
		'in-out-circ': 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
		'in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
	},
	transitionDuration: {
		100: '100ms',
		200: '200ms',
		300: '300ms',
		400: '400ms',
		500: '500ms',
		600: '600ms',
		700: '700ms',
		800: '800ms',
		900: '900ms',
		1000: '1000ms',
	},
	zIndex: {
		auto: 'auto',
		...generateValues(MAX_Z_INDEX, 10, ''),
	},
	aspectRatio: {
		square: '1 / 1',
		video: '1920 / 1080',
	},
	extend: {},
};

module.exports = {
	content: [
		'./assets/**/*.liquid',
		'./config/**/*.liquid',
		'./layout/**/*.liquid',
		'./sections/**/*.liquid',
		'./snippets/**/*.liquid',
		'./templates/**/*.liquid',
		'./src/components/**/*.{js,jsx,ts,tsx}',
	],
	darkMode: 'class',
	theme,
	plugins: [],
};

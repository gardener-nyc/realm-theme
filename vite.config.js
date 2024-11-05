import shopify from 'vite-plugin-shopify';
import copy from 'rollup-plugin-copy';

export default {
	build: {
		minify: true,
		sourcemap: true,
		emptyOutDir: true,
	},

	server: {
		host: true,
		port: 3000,
	},

	publicDir: 'public',

	plugins: [
		copy({
			targets: [{src: 'public/**', dest: 'assets'}],
		}),

		shopify({
			themeRoot: './',
			sourceCodeDir: './src',
			entrypointsDir: './src/entrypoints',
			snippetFile: 'assets.liquid',
		}),
	],
};

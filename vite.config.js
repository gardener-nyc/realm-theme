import shopify from 'vite-plugin-shopify';

export default {
	build: {
		minify: true,
		sourcemap: true,
	},
	server: {
		host: true,
		port: 3000,
	},
	publicDir: 'public',
	plugins: [
		shopify({
			themeRoot: './',
			sourceCodeDir: './src',
			entrypointsDir: './src/entrypoints',
			snippetFile: 'assets.liquid',
		}),
	],
};

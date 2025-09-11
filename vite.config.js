import shopify from 'vite-plugin-shopify';
import copy from 'rollup-plugin-copy';

export default {
	build: {
		minify: true,
		sourcemap: true,
		emptyOutDir: true,
		manifest: 'manifest.json',
	},

	server: {
		host: true,
		port: 3000,

		server: {
			cors: {
				origin: [
					/^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/,
					'http://970a4f-40.myshopify.com',
					'https://970a4f-40.myshopify.com',
					'https://www.breatherealm.co',
				],
			},
		},
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

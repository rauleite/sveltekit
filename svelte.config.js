import adapter from '@sveltejs/adapter-cloudflare';
// import adapter from '@sveltejs/adapter-auto';

// import { vitePreprocess } from '@sveltejs/kit/vite';

import preprocess from 'svelte-preprocess';
// import autoprefixer from 'autoprefixer'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors

	preprocess: preprocess({
		postcss: true
	}),

	// preprocess: vitePreprocess(),

	// preprocess: vitePreprocess({
	// 	style: {
	// 		css: {
	// 			postcss: true
	// 		}
	// 	}
	// }),

	// preprocess: vitePreprocess({
	// 	style: {
	// 		css: {
	// 			// postcss: ['postcss-preset-env']
	// 			postcss: [presetEnv(), autoprefixer()]
	// 		}
	// 	}
	// }),

	kit: {
		adapter: adapter({
			// See below for an explanation of these options
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		})
	}
	// kit: {
	// 	// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
	// 	// If your environment is not supported or you settled on a specific environment, switch out the adapter.
	// 	// See https://kit.svelte.dev/docs/adapters for more information about adapters.
	// 	adapter: adapter()
	// }
};

export default config;

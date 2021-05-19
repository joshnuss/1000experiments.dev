import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import sveltePreprocess from 'svelte-preprocess'
import vercel from '@sveltejs/adapter-vercel'

export default {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [mdsvex(mdsvexConfig), sveltePreprocess()],

	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: vercel(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

    prerender: {
			force: true
		}
	}
};

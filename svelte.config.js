import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import sveltePreprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-vercel'

export default {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [mdsvex(mdsvexConfig), sveltePreprocess()],

  kit: {
    adapter: adapter()
  }
}

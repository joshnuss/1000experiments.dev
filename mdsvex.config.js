import { createRequire } from 'module'
import './src/lib/highlight.js'

const require = createRequire(import.meta.url)

export default {
	extensions: [".svelte.md", ".md", ".svx"],
	smartypants: {
		dashes: "oldschool",
	},
	remarkPlugins: [
		[require("remark-github"), {
			// Use your own repository
			repository: "https://github.com/joshnuss/1000experiments.dev.git",
		}],
		require("remark-abbr"),
    require('remark-emoji')
	],
	rehypePlugins: [
		require("rehype-slug"),
		[require("rehype-autolink-headings"), {
			behavior: "wrap",
		}],
	]
}

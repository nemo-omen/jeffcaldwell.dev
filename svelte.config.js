import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import adapter from '@sveltejs/adapter-static';
import netlify from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    "extensions": [".svelte", ...mdsvexConfig.extensions],

    kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: 'body',
        // adapter: adapter({
        //     pages: 'build',
        //     assets: 'build',
        //     fallback: null
        // }),
        adapter: netlify(),
	},

    preprocess: [mdsvex(mdsvexConfig), preprocess({})]
};

export default config;

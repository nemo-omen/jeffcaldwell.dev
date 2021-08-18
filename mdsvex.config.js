import { join } from 'path';

const config = {
  "extensions": [".svelte.md", ".md", ".svx"],

  "smartypants": {
    "dashes": "oldschool"
  },
  "layout": {
    "writing": "./src/lib/layouts/writing.svelte",
  },

  "remarkPlugins": [],

  "rehypePlugins": []
};

export default config;
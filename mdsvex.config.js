import { join } from 'path';

const config = {
  "extensions": [".svelte.md", ".md", ".svx"],

  "smartypants": {
    "dashes": "oldschool"
  },
  "layout": {
    "writing": "./src/layouts/writing.svelte",
    "work": "./src/layouts/work.svelte",
  },

  "remarkPlugins": [],
  "rehypePlugins": []
};

export default config;
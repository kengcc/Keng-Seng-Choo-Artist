import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import fs from 'node:fs';

const base = process.env.SITE_BASE || '/';
const dimensions = JSON.parse(fs.readFileSync(new URL('./src/data/media-dimensions.json', import.meta.url), 'utf8'));
// Rewrite Markdown links as well as template links for GitHub project sites.
function contentBase() {
  return (tree) => {
    const walk = node => {
      if (typeof node.url === 'string' && node.url.startsWith('/') && !node.url.startsWith('//')) {
        node.url = `${base.replace(/\/$/, '')}${node.url}`;
      }
      for (const child of node.children || []) walk(child);
    };
    walk(tree);
  };
}
function imageAttributes() {
  return tree => {
    const walk = node => {
      if (node.type === 'element' && node.tagName === 'img') {
        const src = node.properties?.src || '';
        const relative = base === '/' ? src : src.replace(base.replace(/\/$/, ''), '');
        node.properties = { ...node.properties, ...dimensions[relative], loading: 'lazy', decoding: 'async' };
      }
      for (const child of node.children || []) walk(child);
    };
    walk(tree);
  };
}

export default defineConfig({
  devToolbar: { enabled: false },
  output: 'static',
  base,
  ...(process.env.SITE_URL ? { site: process.env.SITE_URL } : {}),
  trailingSlash: 'always',
  markdown: { processor: unified({ remarkPlugins: [contentBase], rehypePlugins: [imageAttributes] }) },
});

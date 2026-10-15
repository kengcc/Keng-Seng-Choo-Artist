import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import legacy from '../src/data/legacy-urls.json' with { type: 'json' };
const dist = path.resolve('dist');
const base = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const site = process.env.SITE_URL;
const href = url => `${base}${url}`;
const escape = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const xml = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;');
let redirects = 0;
const cf = [];
for (const [old, target] of Object.entries(legacy)) {
  if (old.includes('?')) continue;
  const decoded = decodeURIComponent(old).replace(/^\//,'').replace(/\/$/,'');
  const file = path.resolve(dist, decoded.endsWith('.html') ? decoded : path.join(decoded,'index.html'));
  if (!file.startsWith(dist + path.sep)) throw new Error('Unsafe legacy path');
  if (fs.existsSync(file)) continue;
  const to = href(target);
  const canonical = site ? `<link rel="canonical" href="${escape(new URL(to,site).href)}">` : '';
  fs.mkdirSync(path.dirname(file), { recursive:true });
  fs.writeFileSync(file, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Continue · Keng Seng Choo</title><meta http-equiv="refresh" content="0;url=${escape(to)}">${canonical}</head><body><p>This page has moved. <a href="${escape(to)}">Continue to Keng Seng Choo’s website</a>.</p></body></html>`);
  cf.push(`${base}${old} ${to} 301`); redirects++;
}
fs.writeFileSync(path.join(dist,'_redirects'),cf.join('\n')+'\n');
fs.writeFileSync(path.join(dist,'.nojekyll'),'');

const publicPages = ['/','/works/','/about/','/about/artist-statement/','/about/a-gentleman-artist/',
  '/collections/praise-of-pigeons/','/articles/','/interviews/','/exhibitions/','/contact/'];
const articles = fs.readdirSync('src/content/articles').filter(n=>n.endsWith('.md')).map(filename => {
  const source = fs.readFileSync(path.join('src/content/articles',filename),'utf8');
  return parseFrontmatter(source).frontmatter;
}).filter(article=>!article.draft);
if (site) {
  const urls = [...publicPages,...articles.map(a=>a.route)].map(url=>`<url><loc>${xml(new URL(href(url),site).href)}</loc></url>`).join('');
  fs.writeFileSync(path.join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  fs.writeFileSync(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${new URL(href('/sitemap.xml'),site).href}\n`);
  const items = articles.sort((a,b)=>b.date.localeCompare(a.date)).map(a=>`<item><title>${xml(a.title)}</title><link>${xml(new URL(href(a.route),site).href)}</link><guid>${xml(new URL(href(a.route),site).href)}</guid><pubDate>${new Date(a.date+'T00:00:00Z').toUTCString()}</pubDate><description>${xml(a.summary)}</description></item>`).join('');
  fs.writeFileSync(path.join(dist,'feed.xml'),`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Keng Seng Choo archive</title><link>${xml(new URL(href('/'),site).href)}</link><description>Articles, exhibitions and interviews.</description>${items}</channel></rss>`);
} else {
  fs.writeFileSync(path.join(dist,'robots.txt'),'User-agent: *\nDisallow: /\n');
}
console.log(`Prepared ${redirects} exact legacy paths; ${articles.length} public articles. ${site ? 'Production sitemap and RSS generated.' : 'Local preview: indexing disabled until SITE_URL is configured.'}`);

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { parseFrontmatter } from '@astrojs/markdown-remark';
const require = createRequire(import.meta.url);
const domino = require('@mixmark-io/domino');
const root = path.resolve('dist');
const base = (process.env.SITE_BASE || '/').replace(/\/$/,'');
const errors = [], files = [];
function walk(dir) { for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
  const file = path.join(dir,entry.name); if(entry.isDirectory())walk(file);else files.push(file);
}}
walk(root);
let links = 0, images = 0, articles = 0;
for (const file of files.filter(p=>p.endsWith('.html'))) {
  const source = fs.readFileSync(file,'utf8');
  const relative = '/'+path.relative(root,file).split(path.sep).join('/');
  const doc = domino.createWindow(source).document;
  if (relative.startsWith('/articles/') && relative !== '/articles/index.html') articles++;
  if (!doc.querySelector('title')) errors.push(`${relative}: missing title`);
  if (/\[(?:nggallery|caption)\b|DB_PASSWORD|CREATE TABLE|wp_rypx60_users|post_password/.test(source)) errors.push(`${relative}: raw WordPress content or sensitive data`);
  if (/[\u0080-\u009f]|(?:ç”»|é¾š|å¹´|ä¸€|æœ¯)/u.test(doc.body.textContent)) errors.push(`${relative}: unresolved encoding`);
  for (const element of Array.from(doc.querySelectorAll('[href], img[src], script[src]'))) {
    const value = element.getAttribute('href') || element.getAttribute('src');
    if (!value || value.startsWith('#') || /^(mailto:|tel:|https?:|data:)/i.test(value)) continue;
    if (value.startsWith('javascript:')) {errors.push(`${relative}: unsafe URL`);continue;}
    let pathname;
    try { pathname = decodeURIComponent(new URL(value, 'https://local.test'+base+relative).pathname); } catch { errors.push(`${relative}: malformed URL ${value}`);continue; }
    if (base && !pathname.startsWith(base+'/')) {errors.push(`${relative}: missing project base ${value}`);continue;}
    pathname = pathname.slice(base.length).replace(/^\//,'');
    const candidate = path.resolve(root,pathname);
    if (!candidate.startsWith(root+path.sep) && candidate!==root) {errors.push(`${relative}: path traversal`);continue;}
    if (![candidate,path.join(candidate,'index.html')].some(p=>fs.existsSync(p)&&fs.statSync(p).isFile())) errors.push(`${relative}: missing target ${value}`);
    links++;
    if (element.tagName === 'IMG') {
      images++;if(!element.getAttribute('alt'))errors.push(`${relative}: image missing alternative text`);
    }
  }
  for (const image of Array.from(doc.querySelectorAll('img[src]'))) {
    if (/kengsengchoo\.com\/(?:wp-content|nextgen)/.test(image.getAttribute('src'))) errors.push(`${relative}: image still depends on WordPress`);
  }
}
const sourceArticles = fs.readdirSync('src/content/articles').filter(n=>n.endsWith('.md'))
  .map(n=>parseFrontmatter(fs.readFileSync(path.join('src/content/articles',n),'utf8')).frontmatter).filter(a=>!a.draft);
if (articles !== sourceArticles.length) errors.push(`Expected ${sourceArticles.length} public article pages, found ${articles}`);
if(sourceArticles.filter(a=>a.wordpressId).length!==31)errors.push('Migration baseline: expected all 31 WordPress article IDs');
const hasMigration = fs.existsSync('../migration/work/private-artwork-candidates.json');
const privateFiles = hasMigration ? JSON.parse(fs.readFileSync('../migration/work/private-artwork-candidates.json','utf8')) : [];
const publicManifest = hasMigration ? JSON.parse(fs.readFileSync('../migration/work/media-manifest.json','utf8')) : [];
const publicNames = new Set(publicManifest.map(p=>path.basename(p.path)));
for(const item of privateFiles) {
  const name=path.basename(item.path);
  if(!publicNames.has(name)&&fs.existsSync(path.join(root,'media',name))) errors.push(`Unselected private image included: ${name}`);
}
if(fs.existsSync(path.join(root,'sitemap.xml'))&&fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').includes('/vip/'))errors.push('VIP appears in sitemap');
const result = {htmlFiles:files.filter(p=>p.endsWith('.html')).length,articles,internalReferences:links,imageReferences:images,base:base||'/',migrationPrivacyCheck:hasMigration?'performed':'workspace unavailable; public source only',errors};
const reportDir=hasMigration?'../migration/work':'reports';fs.mkdirSync(reportDir,{recursive:true});
fs.writeFileSync(path.join(reportDir,'static-validation.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(errors.length)process.exitCode=1;

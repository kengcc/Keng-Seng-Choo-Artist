import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import works from '../src/data/artworks.json' with { type: 'json' };
const require=createRequire(import.meta.url);
const domino=require('@mixmark-io/domino');
const root=path.resolve('dist');
const configuredOrigin=process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : undefined;
const files=[];const errors=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(f.endsWith('.html'))files.push(f);}}
walk(root);
let structuredPages=0,artworks=0,articles=0;const artistIds=new Set();
for(const f of files){
  const doc=domino.createWindow(fs.readFileSync(f,'utf8')).document;
  if(doc.querySelector('meta[http-equiv=refresh]')||doc.querySelector('meta[name=robots]')?.getAttribute('content')?.includes('noindex'))continue;
  const canonical=doc.querySelector('link[rel=canonical]')?.getAttribute('href');
  if(!canonical){errors.push(`${f}: missing canonical`);continue;}
  const url=new URL(canonical);
  if(configuredOrigin&&url.origin!==configuredOrigin)errors.push(`${f}: canonical differs from configured hosting origin`);
  if(url.protocol!=='https:')errors.push(`${f}: canonical must use HTTPS`);
  const script=doc.querySelector('script[type="application/ld+json"]');
  if(!script){errors.push(`${f}: missing structured data`);continue;}
  try{
    const data=JSON.parse(script.textContent);structuredPages++;
    const graph=data['@graph'];const person=graph.find(n=>n['@type']==='Person');
    if(person?.name!=='Keng Seng Choo'||person?.alternateName!=='龚明金')errors.push(`${f}: artist identity mismatch`);
    artistIds.add(person['@id']);
    for(const node of graph){
      if(['Product','Offer','AggregateRating'].includes(node['@type']))errors.push(`${f}: unsupported market/review claim`);
      if(node['@type']==='VisualArtwork'){
        artworks++;
        if(node.creator?.['@id']!==person['@id'])errors.push(`${f}: incorrect artwork creator`);
        const recorded=works.find(w=>node.image?.contentUrl?.endsWith(w.image));
        if(!recorded)errors.push(`${f}: unrecorded artwork image`);
        else {
          if((node.artMedium||null)!==(recorded.medium||null))errors.push(`${f}: artwork medium differs from record`);
          if((node.dateCreated||null)!==(recorded.year?String(recorded.year):null))errors.push(`${f}: artwork year differs from record`);
        }
      }
      if(node['@type']==='Article'){articles++;if(!/^\d{4}-\d{2}-\d{2}$/.test(node.datePublished))errors.push(`${f}: missing original date`);}
    }
    if(!graph.some(n=>n['@type']==='BreadcrumbList'))errors.push(`${f}: missing breadcrumbs`);
  }catch(e){errors.push(`${f}: invalid JSON-LD ${e.message}`);}
  const image=doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
  if(!image)errors.push(`${f}: missing social image`);
  else if(!fs.existsSync(path.join(root,'media',path.basename(new URL(image).pathname))))errors.push(`${f}: missing social image file`);
}
if(artistIds.size!==1)errors.push('Artist entity IDs are inconsistent across pages');
if(artworks!==works.length)errors.push(`Expected ${works.length} indexed artwork pages, got ${artworks}`);
const expectedArticles=fs.readdirSync('src/content/articles').filter(n=>n.endsWith('.md')).map(n=>parseFrontmatter(fs.readFileSync(path.join('src/content/articles',n),'utf8')).frontmatter).filter(a=>!a.draft).length;
if(articles!==expectedArticles)errors.push(`Expected ${expectedArticles} Article schemas, got ${articles}`);
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
if((sitemap.match(/<image:image>/g)||[]).length!==works.length)errors.push('Image sitemap does not cover all public paintings');
if(sitemap.includes('artist-captures-peaceful-ways-of-the-pigeons-2'))errors.push('Duplicate article in discovery sitemap');
const result={structuredPages,artworkPages:artworks,articleSchemas:articles,consistentArtistIdentity:artistIds.size===1,errors};
console.log(JSON.stringify(result,null,2));
if(errors.length)process.exitCode=1;

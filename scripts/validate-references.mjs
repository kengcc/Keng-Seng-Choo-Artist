import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import references from '../src/data/references.json' with { type: 'json' };
import media from '../src/data/reference-media.json' with { type: 'json' };
import earlierExhibitions from '../src/data/earlier-exhibitions.json' with { type: 'json' };
import artworks from '../src/data/external-artworks.json' with { type: 'json' };

const errors = [];
const ids = new Set();
for (const source of references) {
  if (ids.has(source.id)) errors.push(`Duplicate reference: ${source.id}`);
  ids.add(source.id);
  if (new URL(source.url).protocol !== 'https:') errors.push(`Reference must use HTTPS: ${source.id}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(source.checkedAt)) errors.push(`Missing reference check date: ${source.id}`);
}
const imageIds = new Set();
const exhibitionIds = new Set();
for (const entry of earlierExhibitions) {
  if (exhibitionIds.has(entry.id)) errors.push(`Duplicate historical exhibition: ${entry.id}`);
  exhibitionIds.add(entry.id);
  if (!Number.isInteger(entry.year) || entry.year < 1900 || entry.year > new Date().getFullYear()) errors.push(`Invalid exhibition year: ${entry.id}`);
  if (!entry.title || !entry.sourceIds.length) errors.push(`Missing exhibition title/source: ${entry.id}`);
  for (const id of entry.sourceIds) if (!ids.has(id)) errors.push(`Unknown historical exhibition source: ${id}`);
}
for (const image of media) {
  if (imageIds.has(image.id)) errors.push(`Duplicate reference image: ${image.id}`);
  imageIds.add(image.id);
  if (!ids.has(image.sourceId)) errors.push(`Unknown source for image: ${image.id}`);
  if (references.find(source => source.id === image.sourceId)?.url !== image.sourcePage) errors.push(`Image source page differs from reference: ${image.id}`);
  if (!image.credit || !image.originalImage || !image.selectedBy) errors.push(`Missing image provenance: ${image.id}`);
  if (image.thumbnail && !fs.existsSync(path.join('public', image.thumbnail))) errors.push(`Missing artwork thumbnail: ${image.id}`);
  if (!image.image.startsWith('/media/reference-') || !fs.existsSync(path.join('public', image.image))) errors.push(`Missing selected image: ${image.id}`);
}
const artworkIds = new Set();
for (const work of artworks) {
  if (artworkIds.has(work.id)) errors.push(`Duplicate external artwork: ${work.id}`);
  artworkIds.add(work.id);
  if (!work.title || !work.medium || !work.dimensions || !['gallery','auction'].includes(work.group)) errors.push(`Incomplete external artwork: ${work.id}`);
  if (!ids.has(work.sourceId) || !imageIds.has(work.referenceImageId)) errors.push(`Missing artwork source/image: ${work.id}`);
  const image = media.find(image => image.id === work.referenceImageId);
  if (image?.sourceId !== work.sourceId) errors.push(`Artwork/image sources differ: ${work.id}`);
  if (new URL(work.artworkPage).protocol !== 'https:') errors.push(`Artwork link must use HTTPS: ${work.id}`);
  if (work.year !== null && (!Number.isInteger(work.year) || work.year < 1900 || work.year > new Date().getFullYear())) errors.push(`Invalid artwork year: ${work.id}`);
  if (work.additionalSourceIds?.length || work.alternateTitles?.length) errors.push(`Only one latest public reference is allowed per painting: ${work.id}`);
  if (work.catalogueEnd && work.catalogueEnd < work.catalogueDate) errors.push(`Invalid auction date range: ${work.id}`);
  if (work.group === 'auction' && (!work.catalogueDate || !work.lot)) errors.push(`Missing auction date/lot: ${work.id}`);
}
for (const filename of fs.readdirSync('src/content/articles').filter(name => name.endsWith('.md'))) {
  const { frontmatter: article } = parseFrontmatter(fs.readFileSync(path.join('src/content/articles', filename), 'utf8'));
  for (const id of article.sourceIds || []) if (!ids.has(id)) errors.push(`${filename}: unknown source ${id}`);
  if (article.referenceImageId && !imageIds.has(article.referenceImageId)) errors.push(`${filename}: unknown image`);
  if (article.eventStart && article.eventEnd && article.eventEnd < article.eventStart) errors.push(`${filename}: exhibition ends before it starts`);
}

const results = [];
if (process.argv.includes('--live')) {
  const urls = [...new Set([...references.map(source => source.url), ...media.map(image => image.originalImage), ...media.flatMap(image => image.artworkPage ? [image.artworkPage.split('#')[0]] : []), ...artworks.map(work => work.artworkPage.split('#')[0])])];
  // Bound concurrency so repeat checks remain considerate to the source hosts.
  for (let index = 0; index < urls.length; index += 4) {
    const batch = await Promise.all(urls.slice(index, index + 4).map(async url => {
      try {
        const response = await fetch(url, {signal:AbortSignal.timeout(45000), headers:{'User-Agent':'Mozilla/5.0'}});
        const body = await response.arrayBuffer();
        const result = {url, status:response.status, finalUrl:response.url, contentType:response.headers.get('content-type'), bytes:body.byteLength};
        if (!response.ok || body.byteLength === 0) errors.push(`Reference unavailable: ${url} (${response.status})`);
        return result;
      } catch (error) {
        errors.push(`Reference check failed: ${url} (${error.message})`);
        return {url,error:error.message};
      }
    }));
    results.push(...batch);
  }
}
const report = {checkedAt:new Date().toISOString(),references:references.length,selectedImages:media.length,earlierExhibitions:earlierExhibitions.length,externalArtworks:artworks.length,liveChecks:results,errors};
fs.mkdirSync('reports',{recursive:true});
fs.writeFileSync('reports/reference-validation.json', JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({references:references.length,selectedImages:media.length,earlierExhibitions:earlierExhibitions.length,externalArtworks:artworks.length,liveChecks:results.length,errors},null,2));
if (errors.length) process.exitCode = 1;

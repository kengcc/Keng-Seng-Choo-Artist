import type { CollectionEntry } from 'astro:content';
export const sectionLabels = {
  events: 'Exhibitions & events', press: 'Press & interviews', writing: 'Writing & reflections',
  artworks: 'Artwork stories', updates: 'Website & studio notes',
};
export function articleSection(entry: CollectionEntry<'articles'> | CollectionEntry<'pages'>) {
  return entry.data.section || (entry.data.kind === 'exhibition' ? 'events' : entry.data.kind === 'interview' ? 'press' : 'writing');
}
export const languageLabel = (language: string) => language === 'zh' ? '中文' : language === 'en-zh' ? 'EN · 中文' : 'EN';
export function shortSummary(entry: CollectionEntry<'articles'> | CollectionEntry<'pages'>) {
  const summaries: Record<number, string> = {
    217: 'The artist reflects on pigeons, freedom and painting, in his own words in English and Chinese.',
    43: 'A Chinese-language interview by 朵拉 on artistic conviction, oil painting and a lifelong commitment to art.',
    104: 'Two readers reflect on the movement between figurative pigeons and abstraction in a painting.',
    208: 'An exhibition announcement for the 2015 Contemporary Nanyang Art Exhibition at Soka Exhibition Hall.',
    84: 'Five artists from Kedah explore nature and life in a group exhibition at G13 Gallery.',
    275: 'Five paintings explore figures, family and everyday Malaysian life.',
    329: 'Six pigeon paintings from the artist’s original 2016 website collection.',
  };
  const text = summaries[entry.data.wordpressId || 0] || entry.data.summary;
  return text.length > 165 ? text.slice(0, 162).trimEnd() + '…' : text;
}

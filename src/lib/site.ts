import { getCollection } from 'astro:content';

export const href = (path = '/') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const formatDate = (value: string) => new Date(value + 'T00:00:00Z').toLocaleDateString('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
});
export const publicArticles = async () => (await getCollection('articles', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.localeCompare(a.data.date));
export const pageById = async (id: number) => (await getCollection('pages', ({ data }) => !data.draft))
  .find(page => page.data.wordpressId === id)!;

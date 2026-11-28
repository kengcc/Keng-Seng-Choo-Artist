import works from '../data/artworks.json';

export const mainGalleryWorks = works.filter(work => work.displayGroup !== 'article-illustration');

// Curate the fixed selection first, then derive a disjoint hero pool.
const selectedIds = ['wp-gallery-33-330', 'wp-gallery-33-322', 'family-fishing-village-with-boats-5007'];
export const selectedWorks = selectedIds.map(id => {
  const work = mainGalleryWorks.find(work => work.id === id);
  if (!work) throw new Error(`Missing selected artwork: ${id}`);
  return work;
});
export const heroWorks = mainGalleryWorks.filter(work => !selectedIds.includes(work.id));
export const fallbackHero = heroWorks.find(work => work.id === 'wp-gallery-33-328')!;

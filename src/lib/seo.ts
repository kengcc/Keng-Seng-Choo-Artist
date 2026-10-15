import { artist } from '../data/artist';
import { href } from './site';

export const artworkPath = (work: { title: string | null; sourcePictureId: number; slug?: string }) => {
  const label = (work.title || 'archive-painting').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `/works/${work.slug || `${label}-${work.sourcePictureId}`}/`;
};

export function structuredData(options: {
  site: URL; canonical: URL; title: string; description: string;
  pageType?: string; mainEntity?: Record<string, unknown>; extra?: Record<string, unknown>[];
}) {
  const { site, canonical, title, description, pageType = 'WebPage', mainEntity, extra = [] } = options;
  const absolute = (url: string) => new URL(href(url), site).href;
  const home = absolute('/');
  const personId = `${home}#artist`;
  const person = {
    '@type': 'Person', '@id': personId, name: artist.name, alternateName: artist.chineseName,
    url: absolute('/about/'), description: artist.description,
    image: absolute(artist.portrait), jobTitle: 'Artist and painter',
    nationality: { '@type': 'Country', name: 'Malaysia' },
    birthPlace: { '@type': 'Place', name: 'Alor Setar, Kedah, Malaysia' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Nanyang Academy of Fine Arts' },
    knowsAbout: ['Malaysian painting', 'Oil painting', 'Figurative painting', 'Pigeon paintings'],
    sameAs: artist.sameAs,
  };
  const breadcrumbs: Record<string, unknown>[] = [{ '@type': 'ListItem', position: 1, name: 'Home', item: home }];
  if (canonical.href !== home) {
    const relative = canonical.pathname.replace(import.meta.env.BASE_URL.replace(/\/$/, ''), '');
    if (relative.startsWith('/articles/') && relative !== '/articles/') breadcrumbs.push({ '@type': 'ListItem', position: 2, name: 'Archive', item: absolute('/articles/') });
    if (relative.startsWith('/works/') && relative !== '/works/') breadcrumbs.push({ '@type': 'ListItem', position: 2, name: 'Works', item: absolute('/works/') });
    breadcrumbs.push({ '@type': 'ListItem', position: breadcrumbs.length + 1, name: title, item: canonical.href });
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      { '@type': 'WebSite', '@id': `${home}#website`, url: home, name: 'Keng Seng Choo 龚明金', inLanguage: ['en', 'zh'], about: { '@id': personId } },
      { '@type': pageType, '@id': `${canonical.href}#page`, url: canonical.href, name: title, description,
        inLanguage: ['en', 'zh'], isPartOf: { '@id': `${home}#website` }, about: { '@id': personId },
        ...(mainEntity ? { mainEntity } : {}), breadcrumb: { '@id': `${canonical.href}#breadcrumb` } },
      { '@type': 'BreadcrumbList', '@id': `${canonical.href}#breadcrumb`, itemListElement: breadcrumbs },
      ...extra,
    ],
  };
}

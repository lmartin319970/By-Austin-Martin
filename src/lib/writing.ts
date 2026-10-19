import { getCollection } from 'astro:content';
import type { Section } from './genres';

export async function getSectionEntries(section: Section) {
  const writing = await getCollection('writing', ({ data }) => !data.draft && (section === 'writing' || data.portfolio));
  const internal = writing.map(entry => ({ ...entry, href: `/writing/${entry.id}/` }));
  const external = section === 'portfolio'
    ? (await getCollection('portfolio', ({ data }) => !data.draft && data.visible))
      .map(entry => ({ ...entry, href: entry.data.externalUrl }))
    : [];
  return [...internal, ...external].sort((a, b) => {
    if (section === 'portfolio') {
      const order = (a.data.displayOrder ?? Infinity) - (b.data.displayOrder ?? Infinity);
      if (order && !Number.isNaN(order)) return order;
    }
    return b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id);
  });
}

export function publicationCredit(data: {
  publicationType: 'independent' | 'commissioned' | 'external';
  publication: string;
  type: string;
}) {
  const publication = data.publication.trim();
  if (data.publicationType === 'commissioned') {
    return publication ? `Commissioned · Published in ${publication}` : `Commissioned ${data.type}`;
  }
  if (publication) return `Published in ${publication}`;
  return data.publicationType === 'external' ? 'Externally published' : `Independent ${data.type}`;
}

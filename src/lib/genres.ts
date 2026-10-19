export const genres = [
  { slug: 'film', name: 'Film', description: 'Essays and criticism on cinema, characters, and storytelling.' },
  { slug: 'sports', name: 'Sports', description: 'Commentary and stories on competition, teams, and the games we follow.' },
  { slug: 'culture', name: 'Culture', description: 'Writing on art, ideas, and everyday cultural life.' },
  { slug: 'creative', name: 'Creative', description: 'Fiction, short stories, and other creative writing.' },
  { slug: 'local', name: 'Local', description: 'Stories about places, communities, and life close to home.' },
  { slug: 'technology', name: 'Technology', description: 'Writing on technology and its place in our lives.' },
  { slug: 'other', name: 'Other', description: 'Observations, essays, and writing that takes a different path.' },
] as const;

export type Genre = (typeof genres)[number];
export type Section = 'writing' | 'portfolio';
export function genreSlug(category: string) {
  return category === 'Fiction' ? 'creative' : category.toLowerCase();
}

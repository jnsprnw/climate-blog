import type { Post, Term } from '#types/post';

export function term(slug: string, label: string = slug): Term {
	return { slug, label };
}

export function createPost(overrides: Partial<Post> = {}): Post {
	return {
		id: 'id',
		slug: 'slug',
		title: 'Title',
		description: '',
		content: '',
		comment: '',
		url: 'https://example.org',
		date: '',
		created: '2024-01-01 10:00:00.000Z',
		published: '2024-01-02 10:00:00.000Z',
		updated: '2024-01-03 10:00:00.000Z',
		isFavorite: false,
		language: { slug: 'english', label: 'English', key: 'en' },
		schemas: { slug: 'article', label: 'Article', key: 'Article' },
		reference_link: '',
		formats: [],
		authors: [],
		topics: [],
		image: null,
		quote_content: '',
		quote_author: '',
		quote_source_label: '',
		quote_source_url: '',
		related: { publisher: [], formats: [], authors: [], tags: [] },
		relationships: [],
		...overrides
	};
}

import type { Lang } from '#types/ui';

// Shape of the entries in src/data/posts.json as written by api/api.ts

export type Term = {
	label: string;
	slug: string;
};

export type Language = Term & { key: Lang };

export type Schema = Term & { key: string };

export type ImageSize = [width: number, url: string];

export type Image = {
	url: string;
	width: number;
	height: number;
	caption: string;
	alt: string;
	url_rss: string;
	url_preview: string;
	source_url: string;
	source_label: string;
	sizes: ImageSize[];
};

export type RelatedPost = [title: string, slug: string];

export type Dimension = 'tags' | 'publishers' | 'authors' | 'formats';

export type Relationship = {
	slug: string;
	id: string;
	title: string;
	count: number;
	relationships: [Dimension, Term[]][];
};

export type Post = {
	id: string;
	slug: string;
	title: string;
	title_short?: string;
	description: string;
	content: string;
	comment: string;
	url: string;
	date: string;
	created: string;
	published: string;
	updated: string;
	isFavorite: boolean;
	language: Language;
	schemas: Schema;
	publisher?: Term;
	reference?: Term;
	reference_link: string;
	formats: Term[];
	authors: Term[];
	topics: Term[];
	image: Image | null;
	quote_content: string;
	quote_author: string;
	quote_source_label: string;
	quote_source_url: string;
	related: {
		publisher: RelatedPost[];
		formats: RelatedPost[];
		authors: RelatedPost[];
		tags: RelatedPost[];
	};
	relationships: Relationship[];
};

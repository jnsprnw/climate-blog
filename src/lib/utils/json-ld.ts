import type { BlogPosting, WithContext } from 'schema-dts';
import { SITE_AUTHOR } from '#config';
import type { Post } from '#types/post';
import { getAbsoluteURL } from '#utils/url';

export function serializeSchema(schema: BlogPosting) {
	const json: WithContext<BlogPosting> = { '@context': 'https://schema.org', ...schema };
	// Escape `<` so content can never close the script tag
	return `<script type="application/ld+json">${JSON.stringify(json).replace(/</g, '\\u003c')}</script>`;
}

export function createBlogPostingSchema(post: Post): BlogPosting {
	return {
		'@type': 'BlogPosting',
		headline: post.title,
		url: getAbsoluteURL(post.slug),
		// TODO: Add description and image
		author: {
			'@type': 'Person',
			name: SITE_AUTHOR,
			url: 'https://jonasparnow.com/about'
		},
		datePublished: post.published,
		dateCreated: post.created,
		dateModified: post.updated
	};
}

import type { BlogPosting } from 'schema-dts';
import { type Post } from '$types/pocketbase';
import { getAbsoluteURL } from '$utils/url';

export function serializeSchema(schema: BlogPosting) {
	return `<script type="application/ld+json">${JSON.stringify(addContext(schema))}</script>`;
}

function addContext<BlogPosting>(json: BlogPosting) {
	return {
		...json,
		'@context': 'https://schema.org'
	};
}

export function createBlogPostingSchema(post: Post): BlogPosting {
	return {
		'@type': 'BlogPosting',
		headline: post.title,
		url: getAbsoluteURL(`/${post.slug}`),
		// "description": "Write once, read everywhere", // TODO: Add description
		author: {
			'@type': 'Person',
			name: 'Jonas Parnow',
			url: 'https://jonasparnow.com/about'
		},
		// "image": "https://csvbase.com/blog-static/excel.png", // TODO: Add image
		datePublished: post.published,
		dateCreated: post.created,
		dateModified: post.updated
	};
}

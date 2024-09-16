import { getPostBySlug, getAllSlugs } from '$utils/posts';
import { getEntriesList } from '$utils/url';

export async function load({ params }) {
	const { slug } = params;
	return {
		post: getPostBySlug(slug),
		type: 'article',
		path: slug
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return getEntriesList(getAllSlugs().map((slug) => ({ slug })));
}

export const prerender = true;

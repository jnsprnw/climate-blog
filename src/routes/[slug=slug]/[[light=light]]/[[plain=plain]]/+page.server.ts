import { error } from '@sveltejs/kit';
import { getPostBySlug, getAllSlugs, hasImage } from '$utils/posts';
import { getEntriesList } from '$utils/url';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { slug } = params;
	const post = getPostBySlug(slug);

	if (!post) {
		error(404, {
			message: 'Not found'
		});
	}

	const preconnectImage = hasImage(post);
	return {
		post,
		type: 'article',
		path: slug,
		preconnectImage
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return getEntriesList(getAllSlugs().map((slug) => ({ slug })));
}

export const prerender = true;

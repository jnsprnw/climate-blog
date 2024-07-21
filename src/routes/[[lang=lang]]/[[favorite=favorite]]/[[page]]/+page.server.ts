import { getCurrentPosts } from '$lib/utils';

export async function load({ params }) {
	const { lang, favorite, page } = params;
	return {
		posts: getCurrentPosts(page, favorite === 'favorite', lang)
	};
}

export const csr = false;
export const prerender = true;

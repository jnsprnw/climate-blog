import { getCurrentPosts } from '$utils/posts';
import { checkFavorite } from '$utils/url';

export async function load({ params }) {
	const { lang, favorite, page } = params;
	const isFavorite = checkFavorite(favorite);
	return {
		posts: getCurrentPosts(page, isFavorite, lang)
	};
}

export const csr = false;
export const prerender = true;

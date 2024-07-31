import { getCurrentPosts, getPostsCount } from '$utils/posts';
import { checkFavorite } from '$utils/url';

export async function load({ params }) {
	const { lang, favorite, page } = params;
	const isFavorite = checkFavorite(favorite);
	return {
		posts: getCurrentPosts(page, isFavorite, lang),
		posts_count: getPostsCount()
	};
}

export const prerender = true;

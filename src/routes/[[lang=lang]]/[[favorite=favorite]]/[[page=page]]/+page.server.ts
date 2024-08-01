import { getCurrentPosts, getPostsCount } from '$utils/posts';
import { checkFavorite } from '$utils/url';

export async function load({ params }) {
	const { lang, favorite, page } = params;
	const isFavorite = checkFavorite(favorite);
	const page_current = parseInt(page ?? 1);
	return {
		posts: getCurrentPosts(page_current, isFavorite, lang),
		posts_count: getPostsCount(),
		page_current: page_current,
		path: [lang, isFavorite ? 'favorite' : undefined, page].filter(Boolean).join('/')
	};
}

export const prerender = true;

import { getCurrentPosts, getPostsCount, getLastMod } from '$utils/posts';
import { checkFavorite } from '$utils/url';

export async function load({ params }) {
	const { lang, favorite, page } = params;
	const isFavorite = checkFavorite(favorite);
	const page_current = parseInt(page ?? 1);
	const posts = getCurrentPosts(page_current, isFavorite, lang);
	const lastMod = getLastMod(posts);
	return {
		posts,
		posts_count: getPostsCount(),
		page_current: page_current,
		path: [lang, isFavorite ? 'favorite' : undefined, page].filter(Boolean).join('/'),
		lastMod
	};
}

export const prerender = true;

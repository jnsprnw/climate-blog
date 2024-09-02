import { getCurrentPosts, getPostsCount, getLastMod } from '$utils/posts';
import { checkFavorite } from '$utils/url';

export async function load({ params, url }) {
	const { lang, favorite, page } = params;
	const isFavorite = checkFavorite(favorite);
	const page_current = parseInt(page ?? 1);
	const posts = getCurrentPosts(page_current, isFavorite, lang);
	const lastMod = getLastMod(posts);
	const lightMode = url.searchParams.has('light');
	return {
		posts: posts,
		posts_count: getPostsCount(),
		page_current: page_current,
		path: [lang, isFavorite ? 'favorite' : undefined, page].filter(Boolean).join('/'),
		lastMod,
		lightMode
	};
}

export const prerender = true;

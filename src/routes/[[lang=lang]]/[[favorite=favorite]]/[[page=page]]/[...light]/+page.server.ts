import { getCurrentPosts, getLastMod, getPaginationEntries, getPostsForFilter } from '$utils/posts';
import { checkFavorite, getEntriesList } from '$utils/url';
import { KEY_ALL_POSTS } from '$config';

export async function load({ params }) {
	const { lang, favorite, page } = params;
	const isFavorite = checkFavorite(favorite);
	const page_current = page === KEY_ALL_POSTS ? KEY_ALL_POSTS : parseInt(page ?? 1);
	const posts_filtered = getPostsForFilter(isFavorite, lang);
	const posts_current = getCurrentPosts(page_current, posts_filtered);
	const lastMod = getLastMod(posts_current);
	return {
		posts: posts_current,
		posts_total: posts_filtered.length,
		page_current,
		path: [lang, isFavorite ? 'favorite' : undefined, page].filter(Boolean).join('/'),
		lastMod
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return getEntriesList(getPaginationEntries());
}

export const prerender = true;

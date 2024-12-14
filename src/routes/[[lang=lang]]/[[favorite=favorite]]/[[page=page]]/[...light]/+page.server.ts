import {
	getCurrentPosts,
	getLastMod,
	getPaginationEntries,
	getPostsForFilter,
	getCurrentPath,
	getCurrentFilter,
	hasImages,
	getNextPage
} from '$utils/posts';
import { checkFavorite, getEntriesList } from '$utils/url';
import { KEY_ALL_POSTS } from '$config';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { lang, favorite, page } = params;
	const isFavorite = checkFavorite(favorite);
	const page_current = page === KEY_ALL_POSTS ? KEY_ALL_POSTS : parseInt(page ?? 1);
	const posts_filtered = getPostsForFilter(isFavorite, lang);
	const posts_current = getCurrentPosts(page_current, posts_filtered);
	const lastMod = getLastMod(posts_current);
	const preconnectImage = hasImages(posts_filtered);
	return {
		posts: posts_current,
		posts_total: posts_filtered.length,
		page_current,
		path: getCurrentPath(lang, isFavorite, page),
		lastMod,
		filter: getCurrentFilter(lang, isFavorite, page_current, posts_filtered.length),
		preconnectImage,
		nextPage: getNextPage(page_current, posts_filtered.length)
	};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return getEntriesList(getPaginationEntries());
}

export const prerender = true;

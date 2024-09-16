import { getCurrentPosts, getPostsCount, getLastMod, getPaginationEntries } from '$utils/posts';
import { checkFavorite, getEntriesList } from '$utils/url';

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

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return getEntriesList(getPaginationEntries());
}

export const prerender = true;

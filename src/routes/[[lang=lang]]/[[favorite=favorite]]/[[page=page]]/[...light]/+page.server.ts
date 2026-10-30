import { KEY_MODE_LIGHT } from '#config';
import {
	getCurrentPosts,
	getLastMod,
	getPaginationEntries,
	getPostsForFilter,
	getListPath,
	getCurrentFilter,
	hasImages,
	getNextPage,
	isLang,
	parsePageParam
} from '#utils/posts';
import { checkFavorite, getEntriesList } from '#utils/url';
import type { EntryGenerator, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const lang = isLang(params.lang) ? params.lang : undefined;
	const isFavorite = checkFavorite(params.favorite);
	const page_current = parsePageParam(params.page);
	const posts_filtered = getPostsForFilter(isFavorite, lang);
	const posts_current = getCurrentPosts(page_current, posts_filtered);
	const nextPage = getNextPage(page_current, posts_filtered.length);
	const basePath = getListPath(lang, isFavorite);

	return {
		posts: posts_current,
		posts_total: posts_filtered.length,
		page_current,
		path: getListPath(lang, isFavorite, page_current),
		basePath,
		nextPath: nextPage ? getListPath(lang, isFavorite, nextPage) : undefined,
		lastMod: getLastMod(posts_current),
		filter: getCurrentFilter(lang, isFavorite, page_current, posts_filtered.length),
		preconnectImage: hasImages(posts_current)
	};
};

export const entries: EntryGenerator = () => {
	return getEntriesList(getPaginationEntries(), [KEY_MODE_LIGHT]);
};

export const prerender = true;

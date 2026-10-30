import { LANGUAGES, STR_FAVORITE } from '#config';
import { getCurrentPosts, getPostsForFilter, isLang } from '#utils/posts';
import { renderFeed } from '#utils/rss';
import { checkFavorite, generateFeedURL } from '#utils/url';
import type { EntryGenerator, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const lang = isLang(params.lang) ? params.lang : undefined;
	const isFavorite = checkFavorite(params.favorite);
	const posts = getCurrentPosts(1, getPostsForFilter(isFavorite, lang));

	return new Response(renderFeed(posts, generateFeedURL(lang, isFavorite)), {
		headers: {
			'Content-Type': 'application/rss+xml'
		}
	});
};

export const entries: EntryGenerator = () => {
	return [undefined, ...LANGUAGES].flatMap((lang) =>
		[undefined, STR_FAVORITE].map((favorite) => ({ lang, favorite }))
	);
};

export const prerender = true;

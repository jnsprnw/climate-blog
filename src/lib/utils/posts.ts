import posts from '$posts';
import {
	POSTS_PER_PAGE,
	SITE_DESCRIPTION,
	STRING_PLACEHOLDER,
	LANGUAGES,
	KEY_FAVORITE,
	KEY_ALL_POSTS,
	KEY_MODE_LIGHT,
	STR_FAVORITE
} from '$config';
import type { Post } from '$types/pocketbase';
import type { Lang } from '$types/ui';
import { maxBy, range } from 'lodash-es';

export function getPostsCount() {
	return posts.length;
}

export function getAllSlugs() {
	return posts.map(({ slug }) => slug);
}

export function checkPostSlug(slug: string) {
	return posts.some((post) => post.slug === slug);
}

export function getPostsForFilter(isFavorite: boolean = false, lang: string | undefined): Post[] {
	let data = posts;
	if (isFavorite) {
		data = data.filter((post) => post.isFavorite);
	}
	if (lang) {
		data = data.filter((post) => post.language?.key === lang);
	}
	return data;
}

export function getCurrentPosts(page_number: number | string, posts: Post[]): Post[] {
	if (typeof page_number === 'string' && page_number === KEY_ALL_POSTS) {
		// Display all posts
		return posts;
	} else if (typeof page_number === 'number') {
		// Display posts for separate pages
		return posts.slice((page_number - 1) * POSTS_PER_PAGE, page_number * POSTS_PER_PAGE);
	}
	return [];
}

export function getPostBySlug(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
}

type Page = {
	label: string;
	path: string | undefined;
	isCurrent: boolean;
	isPrev: boolean;
	isNext: boolean;
};

function getPageCountForPosts(posts_total: number): number {
	return Math.ceil(posts_total / POSTS_PER_PAGE);
}

export function getPagination(posts_total: number, currentIndex: number | string) {
	const pages_count = getPageCountForPosts(posts_total);
	const page_list: Page[] = [];
	const next = typeof currentIndex === 'number' ? currentIndex + 1 : undefined;
	const prev = typeof currentIndex === 'number' ? currentIndex - 1 : undefined;
	for (let i = 1; i <= pages_count; i++) {
		let label = String(i);
		let isCurrent = false;
		let isPrev = false;
		let isNext = false;
		if (i === currentIndex) {
			isCurrent = true;
		} else if (i === next) {
			isNext = true;
		} else if (i === prev) {
			isPrev = true;
		}
		if (i === 1) {
			label = 'First page';
		} else if (i === pages_count) {
			label = 'Last page';
		}
		page_list.push({ label, path: i === 1 ? undefined : String(i), isCurrent, isPrev, isNext });
	}
	return {
		list: page_list,
		count: pages_count,
		next: typeof next === 'number' && pages_count < next ? undefined : next,
		prev: typeof prev === 'number' && prev < 0 ? undefined : prev
	};
}

export function getLastMod(arr: Post[]): string | undefined {
	if (Array.isArray(arr) && typeof arr !== 'undefined' && arr.length > 0) {
		return maxBy(arr, (d) => new Date(d.updated))?.updated ?? undefined;
	}
	return undefined;
}

export function getPageDescription() {
	return SITE_DESCRIPTION.replace(STRING_PLACEHOLDER, String(getPostsCount()));
}

export function getPaginationPages() {
	return [undefined, ...LANGUAGES].flatMap((lang) =>
		[true, false].flatMap((isModeLight) => {
			return [true, false].flatMap((favorite) => {
				const posts = getPostsForFilter(favorite, lang);
				const page_count = getPageCountForPosts(posts.length);
				return [KEY_ALL_POSTS, ...range(0, page_count + 1)].map((count) => {
					const posts_filtered = getPostsForFilter(favorite, lang);
					const page_posts = getCurrentPosts(count, posts_filtered);
					const lastMod = getLastMod(page_posts);
					return {
						page:
							count === KEY_ALL_POSTS
								? KEY_ALL_POSTS
								: typeof count === 'number' && count > 0
									? String(count)
									: undefined,
						// page_count,
						// count: posts.length,
						favorite: favorite ? KEY_FAVORITE : undefined,
						lang,
						lastMod,
						light: isModeLight ? KEY_MODE_LIGHT : ''
					};
				});
			});
		})
	);
}

export function getPaginationEntries() {
	return getPaginationPages().map(({ page, lang, favorite }) => ({
		...(page && { page }),
		...(lang && { lang }),
		...(favorite && { favorite })
	}));
}

export function getCurrentPath(lang: Lang, isFavorite: boolean, page: number): string {
	return [lang, isFavorite ? STR_FAVORITE : undefined, page].filter(Boolean).join('/');
}

export function getPostsIndicesFromPageNumber(
	page_current: number | typeof KEY_ALL_POSTS,
	number_total_posts: number
): string {
	if (page_current === KEY_ALL_POSTS) {
		return 'all';
	}
	const start = (page_current - 1) * POSTS_PER_PAGE + 1;
	const end = Math.min(start + POSTS_PER_PAGE, number_total_posts);
	return [start, end].join('–');
}

export function getLanguageName(lang: Lang): string {
	switch (lang) {
		case 'en':
			return 'English';
		case 'de':
			return 'German';
		default:
			return '';
	}
}

export function getCurrentFilter(
	lang: Lang,
	isFavorite: boolean,
	page_current: number | typeof KEY_ALL_POSTS,
	number_total_posts: number
) {
	if (number_total_posts === 0) {
		return null;
	}
	return `You are viewing ${getPostsIndicesFromPageNumber(page_current, number_total_posts)} of ${isFavorite ? 'my favourite' : ''} ${number_total_posts} ${getLanguageName(lang)} post${number_total_posts === 1 ? '' : 's'}.`;
}

export function hasImage(post: Post) {
	return post.image?.url;
}

export function hasImages(posts: Post[]) {
	return posts.some(hasImage);
}

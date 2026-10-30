import { maxBy } from 'lodash-es';
import {
	KEY_ALL_POSTS,
	LANGUAGES,
	POSTS_PER_PAGE,
	SITE_DESCRIPTION,
	STR_FAVORITE,
	STRING_PLACEHOLDER,
	DIMENSIONS
} from '#config';
import type { Dimension, Post } from '#types/post';
import type { Lang } from '#types/ui';
import { posts } from '#utils/data';

export type PageNumber = number | typeof KEY_ALL_POSTS;

export function isLang(value: string | undefined): value is Lang {
	return (LANGUAGES as string[]).includes(value ?? '');
}

export function getDimensionLabel(dimension: Dimension, count: number) {
	return DIMENSIONS[dimension][count === 1 ? 0 : 1];
}

export function getAllSlugs() {
	return posts.map(({ slug }) => slug);
}

export function checkPostSlug(slug: string) {
	return posts.some((post) => post.slug === slug);
}

export function getPostBySlug(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
}

export function getPostsForFilter(isFavorite: boolean = false, lang?: Lang): Post[] {
	return posts.filter(
		(post) => (!isFavorite || post.isFavorite) && (!lang || post.language.key === lang)
	);
}

export function getCurrentPosts<T>(page: PageNumber, list: T[]): T[] {
	if (page === KEY_ALL_POSTS) {
		return list;
	}
	if (page < 1) {
		return [];
	}
	return list.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
}

export function getPageCount(posts_total: number): number {
	return Math.ceil(posts_total / POSTS_PER_PAGE);
}

/**
 * Parses the optional `page` route param. A missing param is the first page.
 */
export function parsePageParam(page: string | undefined): PageNumber {
	if (page === KEY_ALL_POSTS) {
		return KEY_ALL_POSTS;
	}
	return page ? parseInt(page, 10) : 1;
}

/**
 * Path of a list page relative to the root, e.g. `de/favorite/2`.
 * The first page has no page segment.
 */
export function getListPath(
	lang: Lang | undefined,
	isFavorite: boolean,
	page: PageNumber | undefined = 1
): string {
	return [lang, isFavorite ? STR_FAVORITE : undefined, page === 1 ? undefined : page]
		.filter(Boolean)
		.join('/');
}

export function getNextPage(page: PageNumber, posts_total: number): number | undefined {
	return typeof page === 'number' && page < getPageCount(posts_total) ? page + 1 : undefined;
}

export function getPrevPage(page: PageNumber): number | undefined {
	return typeof page === 'number' && page > 1 ? page - 1 : undefined;
}

export type PaginationItem = {
	label: string;
	path: string;
	isCurrent: boolean;
	isPrev: boolean;
	isNext: boolean;
};

/**
 * Builds the pagination for a list page. `basePath` is the path of the current filter
 * (language and favorites) so the links stay within the filter.
 */
export function getPagination(posts_total: number, current: PageNumber, basePath: string = '') {
	const count = getPageCount(posts_total);
	const prev = getPrevPage(current);
	const next = getNextPage(current, posts_total);
	const getPath = (page: PageNumber) =>
		[basePath, page === 1 ? undefined : page].filter(Boolean).join('/');
	const item = (
		label: string,
		page: number,
		props: Partial<PaginationItem> = {}
	): PaginationItem => ({
		label,
		path: getPath(page),
		isCurrent: false,
		isPrev: false,
		isNext: false,
		...props
	});

	const list: PaginationItem[] = [];
	for (let i = 1; i <= count; i++) {
		if (i === count && next) {
			list.push(item('Next page', next, { isNext: true }));
		}
		const label = i === 1 ? 'First page' : i === count ? 'Last page' : String(i);
		list.push(item(label, i, { isCurrent: i === current }));
		if (i === 1 && prev) {
			list.push(item('Previous page', prev, { isPrev: true }));
		}
	}

	return {
		list,
		count,
		first: getPath(1),
		last: getPath(count),
		prev: prev ? getPath(prev) : undefined,
		next: next ? getPath(next) : undefined,
		all: getPath(KEY_ALL_POSTS)
	};
}

export function getLastMod(list: Post[]): string | undefined {
	return maxBy(list, (post) => new Date(post.updated).getTime())?.updated;
}

export function getPageDescription(include_count: boolean = true) {
	return SITE_DESCRIPTION.replace(
		STRING_PLACEHOLDER,
		include_count ? String(posts.length) : ''
	).replace('  ', ' ');
}

/**
 * All combinations of the `lang`, `favorite` and `page` params that should be prerendered.
 */
export function getPaginationEntries() {
	return [undefined, ...LANGUAGES].flatMap((lang) =>
		[true, false].flatMap((isFavorite) => {
			const page_count = getPageCount(getPostsForFilter(isFavorite, lang).length);
			const pages: (PageNumber | undefined)[] = [undefined, KEY_ALL_POSTS];
			for (let page = 1; page <= page_count; page++) {
				pages.push(page);
			}
			return pages.map((page) => ({
				...(page !== undefined && { page: String(page) }),
				...(lang && { lang }),
				...(isFavorite && { favorite: STR_FAVORITE })
			}));
		})
	);
}

export function getPostsRange(page: PageNumber, posts_total: number): string {
	if (page === KEY_ALL_POSTS) {
		return 'all';
	}
	const start = (page - 1) * POSTS_PER_PAGE + 1;
	const end = Math.min(start + POSTS_PER_PAGE - 1, posts_total);
	return `${start}–${end}`;
}

export function getLanguageName(lang: Lang | undefined): string {
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
	lang: Lang | undefined,
	isFavorite: boolean,
	page: PageNumber,
	posts_total: number
): string | null {
	if (
		posts_total === 0 ||
		(typeof page === 'number' && (page - 1) * POSTS_PER_PAGE >= posts_total)
	) {
		return null;
	}
	const words = [
		'You are viewing',
		getPostsRange(page, posts_total),
		'of',
		isFavorite ? 'my favourite' : '',
		String(posts_total),
		getLanguageName(lang),
		posts_total === 1 ? 'post' : 'posts'
	];
	return `${words.filter(Boolean).join(' ')}.`;
}

export function hasImage(post: Post): boolean {
	return Boolean(post.image?.url);
}

export function hasImages(list: Post[]): boolean {
	return list.some(hasImage);
}

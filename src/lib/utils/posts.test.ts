import { describe, expect, test } from 'bun:test';
import { KEY_ALL_POSTS, POSTS_PER_PAGE, STR_FAVORITE } from '#config';
import { posts } from '#utils/data';
import {
	checkPostSlug,
	getCurrentFilter,
	getCurrentPosts,
	getLastMod,
	getListPath,
	getNextPage,
	getPageCount,
	getPageDescription,
	getPagination,
	getPaginationEntries,
	getPostBySlug,
	getPostsForFilter,
	getPostsRange,
	getPrevPage,
	isLang,
	parsePageParam
} from '#utils/posts';
import { createPost } from '../../test/fixtures.ts';

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

describe('isLang', () => {
	test('accepts configured languages only', () => {
		expect(isLang('en')).toBe(true);
		expect(isLang('de')).toBe(true);
		expect(isLang('fr')).toBe(false);
		expect(isLang('')).toBe(false);
		expect(isLang(undefined)).toBe(false);
	});
});

describe('parsePageParam', () => {
	test('defaults to the first page', () => {
		expect(parsePageParam(undefined)).toBe(1);
	});

	test('parses numbers and the all-posts key', () => {
		expect(parsePageParam('3')).toBe(3);
		expect(parsePageParam(KEY_ALL_POSTS)).toBe(KEY_ALL_POSTS);
	});
});

describe('getCurrentPosts', () => {
	const list = range(25);

	test('slices the requested page', () => {
		expect(getCurrentPosts(1, list)).toEqual(range(10));
		expect(getCurrentPosts(3, list)).toEqual([21, 22, 23, 24, 25]);
	});

	test('returns everything for the all-posts page', () => {
		expect(getCurrentPosts(KEY_ALL_POSTS, list)).toBe(list);
	});

	test('returns nothing for pages out of range', () => {
		expect(getCurrentPosts(0, list)).toEqual([]);
		expect(getCurrentPosts(4, list)).toEqual([]);
	});
});

describe('page navigation', () => {
	test('getPageCount rounds up', () => {
		expect(getPageCount(0)).toBe(0);
		expect(getPageCount(POSTS_PER_PAGE)).toBe(1);
		expect(getPageCount(POSTS_PER_PAGE + 1)).toBe(2);
	});

	test('getNextPage stops at the last page', () => {
		expect(getNextPage(1, 25)).toBe(2);
		expect(getNextPage(2, 25)).toBe(3);
		expect(getNextPage(3, 25)).toBeUndefined();
		expect(getNextPage(KEY_ALL_POSTS, 25)).toBeUndefined();
	});

	test('getPrevPage stops at the first page', () => {
		expect(getPrevPage(1)).toBeUndefined();
		expect(getPrevPage(2)).toBe(1);
		expect(getPrevPage(KEY_ALL_POSTS)).toBeUndefined();
	});
});

describe('getListPath', () => {
	test('omits the first page and empty filters', () => {
		expect(getListPath(undefined, false)).toBe('');
		expect(getListPath(undefined, false, 1)).toBe('');
		expect(getListPath(undefined, false, 2)).toBe('2');
	});

	test('combines language, favorites and page', () => {
		expect(getListPath('de', true, 2)).toBe(`de/${STR_FAVORITE}/2`);
		expect(getListPath('en', false, KEY_ALL_POSTS)).toBe(`en/${KEY_ALL_POSTS}`);
		expect(getListPath(undefined, true)).toBe(STR_FAVORITE);
	});
});

describe('getPagination', () => {
	test('links of the first page', () => {
		const pagination = getPagination(30, 1);
		expect(pagination.count).toBe(3);
		expect(pagination.prev).toBeUndefined();
		expect(pagination.next).toBe('2');
		expect(pagination.list.map(({ label, path }) => [label, path])).toEqual([
			['First page', ''],
			['2', '2'],
			['Next page', '2'],
			['Last page', '3']
		]);
		expect(pagination.list.find(({ isCurrent }) => isCurrent)?.label).toBe('First page');
	});

	test('links stay within the current filter', () => {
		const pagination = getPagination(30, 2, 'en/favorite');
		expect(pagination.first).toBe('en/favorite');
		expect(pagination.prev).toBe('en/favorite');
		expect(pagination.next).toBe('en/favorite/3');
		expect(pagination.last).toBe('en/favorite/3');
		expect(pagination.all).toBe('en/favorite/all');
		expect(pagination.list.every(({ path }) => path.startsWith('en/favorite'))).toBe(true);
	});

	test('the all-posts page has no previous or next links', () => {
		const pagination = getPagination(30, KEY_ALL_POSTS);
		expect(pagination.prev).toBeUndefined();
		expect(pagination.next).toBeUndefined();
		expect(pagination.list.map(({ label }) => label)).toEqual(['First page', '2', 'Last page']);
		expect(pagination.list.some(({ path }) => path.includes('NaN'))).toBe(false);
	});

	test('the last page has no next link', () => {
		const pagination = getPagination(30, 3);
		expect(pagination.next).toBeUndefined();
		expect(pagination.list.map(({ label }) => label)).toEqual([
			'First page',
			'Previous page',
			'2',
			'Last page'
		]);
	});

	test('only the dedicated links are marked as prev and next', () => {
		const pagination = getPagination(30, 2);
		expect(pagination.list.filter(({ isPrev }) => isPrev).map(({ label }) => label)).toEqual([
			'Previous page'
		]);
		expect(pagination.list.filter(({ isNext }) => isNext).map(({ label }) => label)).toEqual([
			'Next page'
		]);
	});
});

describe('getCurrentFilter', () => {
	test('describes the current selection', () => {
		expect(getCurrentFilter(undefined, false, 1, 25)).toBe('You are viewing 1–10 of 25 posts.');
		expect(getCurrentFilter('de', true, 3, 25)).toBe(
			'You are viewing 21–25 of my favourite 25 German posts.'
		);
		expect(getCurrentFilter('en', false, KEY_ALL_POSTS, 1)).toBe(
			'You are viewing all of 1 English post.'
		);
	});

	test('returns null for empty or out-of-range pages', () => {
		expect(getCurrentFilter(undefined, false, 1, 0)).toBeNull();
		expect(getCurrentFilter(undefined, false, 3, 20)).toBeNull();
		expect(getCurrentFilter(undefined, false, 4, 25)).toBeNull();
	});

	test('getPostsRange clamps the end to the total', () => {
		expect(getPostsRange(2, 15)).toBe('11–15');
		expect(getPostsRange(KEY_ALL_POSTS, 15)).toBe('all');
	});
});

describe('getLastMod', () => {
	test('returns the most recent update', () => {
		const list = [
			createPost({ updated: '2024-01-01 10:00:00.000Z' }),
			createPost({ updated: '2024-03-01 10:00:00.000Z' }),
			createPost({ updated: '2024-02-01 10:00:00.000Z' })
		];
		expect(getLastMod(list)).toBe('2024-03-01 10:00:00.000Z');
	});

	test('returns undefined for an empty list', () => {
		expect(getLastMod([])).toBeUndefined();
	});
});

describe('data access', () => {
	test('posts can be found by slug', () => {
		const [first] = posts;
		expect(checkPostSlug(first.slug)).toBe(true);
		expect(getPostBySlug(first.slug)).toBe(first);
		expect(checkPostSlug('does-not-exist')).toBe(false);
		expect(getPostBySlug('does-not-exist')).toBeUndefined();
	});

	test('slugs are unique', () => {
		const slugs = posts.map(({ slug }) => slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	test('filters by favorite and language', () => {
		expect(getPostsForFilter()).toHaveLength(posts.length);
		expect(getPostsForFilter(true).every(({ isFavorite }) => isFavorite)).toBe(true);
		expect(getPostsForFilter(false, 'de').every(({ language }) => language.key === 'de')).toBe(
			true
		);
		expect(getPostsForFilter(false, 'en').length + getPostsForFilter(false, 'de').length).toBe(
			posts.length
		);
	});

	test('the page description contains the number of posts', () => {
		expect(getPageDescription()).toContain(` ${posts.length} `);
		expect(getPageDescription(false)).not.toContain('%%');
		expect(getPageDescription(false)).not.toContain('  ');
	});
});

describe('getPaginationEntries', () => {
	const entries = getPaginationEntries();
	const keys = entries.map((entry) => JSON.stringify(entry));

	test('has no duplicates', () => {
		expect(new Set(keys).size).toBe(keys.length);
	});

	test('includes the root, the all-posts page and every page of each filter', () => {
		expect(entries).toContainEqual({});
		expect(entries).toContainEqual({ page: KEY_ALL_POSTS });
		expect(entries).toContainEqual({ lang: 'de', favorite: STR_FAVORITE });
		const pages = entries.filter((entry) => Object.keys(entry).join() === 'page');
		expect(pages).toHaveLength(getPageCount(posts.length) + 1);
	});
});

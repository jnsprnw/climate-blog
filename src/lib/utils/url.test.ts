import { describe, expect, test } from 'bun:test';
import {
	checkFavorite,
	generateFeedURL,
	getAbsoluteURL,
	getEntriesList,
	getRelativeURL,
	getURL
} from '#utils/url';

describe('getURL', () => {
	const base = 'https://example.com/';

	test('joins the path to the base', () => {
		expect(getURL('', false, base).href).toBe('https://example.com/');
		expect(getURL('/', false, base).href).toBe('https://example.com/');
		expect(getURL('about', false, base).href).toBe('https://example.com/about');
		expect(getURL('/en/favorite/2', false, base).href).toBe('https://example.com/en/favorite/2');
	});

	test('appends the light mode segment', () => {
		expect(getURL('', true, base).href).toBe('https://example.com/light');
		expect(getURL('/', true, base).href).toBe('https://example.com/light');
		expect(getURL('about', true, base).href).toBe('https://example.com/about/light');
	});

	test('collapses repeated slashes', () => {
		expect(getURL('//en//2/', false, base).href).toBe('https://example.com/en/2');
	});
});

test('getAbsoluteURL and getRelativeURL use the public page URL', () => {
	expect(getAbsoluteURL('about')).toBe('https://example.com/about');
	expect(getRelativeURL('about', true)).toBe('/about/light');
});

test('checkFavorite', () => {
	expect(checkFavorite('favorite')).toBe(true);
	expect(checkFavorite('other')).toBe(false);
	expect(checkFavorite(undefined)).toBe(false);
});

test('generateFeedURL', () => {
	expect(generateFeedURL(undefined, false)).toBe('https://example.com/rss.xml');
	expect(generateFeedURL('de', true)).toBe('https://example.com/de/favorite/rss.xml');
});

describe('getEntriesList', () => {
	test('creates every combination of the modes', () => {
		expect(getEntriesList([{ slug: 'a' }], ['light', 'plain'])).toEqual([
			{ slug: 'a', light: '', plain: '' },
			{ slug: 'a', light: '', plain: 'plain' },
			{ slug: 'a', light: 'light', plain: '' },
			{ slug: 'a', light: 'light', plain: 'plain' }
		]);
	});

	test('only adds the given modes', () => {
		expect(getEntriesList([{ page: '2' }], ['light'])).toEqual([
			{ page: '2', light: '' },
			{ page: '2', light: 'light' }
		]);
	});
});

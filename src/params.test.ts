import { describe, expect, test } from 'bun:test';
import { posts } from '#utils/data';
import { params } from './params.ts';

function matches(name: keyof typeof params, value: string): boolean {
	const result = params[name]['~standard'].validate(value) as { issues?: unknown };
	return !result.issues;
}

describe('param matchers', () => {
	test('page', () => {
		expect(matches('page', '1')).toBe(true);
		expect(matches('page', '12')).toBe(true);
		expect(matches('page', 'all')).toBe(true);
		expect(matches('page', '0')).toBe(false);
		expect(matches('page', '01')).toBe(false);
		expect(matches('page', 'abc')).toBe(false);
	});

	test('lang', () => {
		expect(matches('lang', 'en')).toBe(true);
		expect(matches('lang', 'de')).toBe(true);
		expect(matches('lang', 'fr')).toBe(false);
	});

	test('modes and favorite', () => {
		expect(matches('light', 'light')).toBe(true);
		expect(matches('light', 'dark')).toBe(false);
		expect(matches('plain', 'plain')).toBe(true);
		expect(matches('favorite', 'favorite')).toBe(true);
		expect(matches('favorite', 'favourite')).toBe(false);
	});

	test('slug', () => {
		expect(matches('slug', posts[0].slug)).toBe(true);
		expect(matches('slug', 'about')).toBe(false);
	});
});

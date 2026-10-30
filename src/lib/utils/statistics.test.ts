import { describe, expect, test } from 'bun:test';
import {
	getAuthorsByCount,
	getPublishersByCount,
	getTagCombinationsByCount,
	getTagsByCount
} from '#utils/statistics';
import { createPost, term } from '../../test/fixtures.ts';

const climate = term('climate', 'Climate');
const coal = term('coal', 'Coal');
const ice = term('ice', 'Ice');

const posts = [
	createPost({ topics: [climate, coal], authors: [term('b', 'B')], publisher: term('p', 'P') }),
	createPost({ topics: [coal, climate, ice], authors: [term('a', 'A')] }),
	createPost({ topics: [climate, ice], authors: [term('b', 'B')], publisher: term('p', 'P') }),
	createPost({ topics: [ice, climate] })
];

describe('getTagsByCount', () => {
	test('counts and sorts by count', () => {
		expect(getTagsByCount(posts)).toEqual([
			{ slug: 'climate', label: 'Climate', count: 4 },
			{ slug: 'ice', label: 'Ice', count: 3 },
			{ slug: 'coal', label: 'Coal', count: 2 }
		]);
	});

	test('sorts equal counts alphabetically', () => {
		expect(getAuthorsByCount(posts).map(({ label }) => label)).toEqual(['B', 'A']);
		const tie = [
			createPost({ authors: [term('z', 'Z')] }),
			createPost({ authors: [term('y', 'Y')] })
		];
		expect(getAuthorsByCount(tie).map(({ label }) => label)).toEqual(['Y', 'Z']);
	});
});

test('getPublishersByCount skips posts without a publisher', () => {
	expect(getPublishersByCount(posts)).toEqual([{ slug: 'p', label: 'P', count: 2 }]);
});

describe('getTagCombinationsByCount', () => {
	test('counts each pair once per post, regardless of order', () => {
		expect(getTagCombinationsByCount(posts)).toEqual([
			{ count: 3, labels: ['Climate', 'Ice'], slugs: ['climate', 'ice'] },
			{ count: 2, labels: ['Climate', 'Coal'], slugs: ['climate', 'coal'] }
		]);
	});

	test('ignores combinations that occur only once', () => {
		expect(getTagCombinationsByCount([createPost({ topics: [climate, coal] })])).toEqual([]);
	});
});

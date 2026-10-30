import type { Post, Term } from '#types/post';
import { posts as allPosts } from '#utils/data';

export type PropertyCount = {
	count: number;
	label: string;
	slug: string;
};

export type TagCombination = {
	count: number;
	labels: [string, string];
	slugs: [string, string];
};

function countTerms(terms: Term[]): PropertyCount[] {
	const counts = new Map<string, PropertyCount>();

	for (const { slug, label } of terms) {
		const entry = counts.get(slug);
		if (entry) {
			entry.count += 1;
		} else {
			counts.set(slug, { count: 1, label, slug });
		}
	}

	return Array.from(counts.values()).sort((a, b) =>
		a.count === b.count ? a.label.localeCompare(b.label) : b.count - a.count
	);
}

export function getTagsByCount(posts: Post[] = allPosts): PropertyCount[] {
	return countTerms(posts.flatMap((post) => post.topics));
}

export function getFormatsByCount(posts: Post[] = allPosts): PropertyCount[] {
	return countTerms(posts.flatMap((post) => post.formats));
}

export function getAuthorsByCount(posts: Post[] = allPosts): PropertyCount[] {
	return countTerms(posts.flatMap((post) => post.authors));
}

export function getPublishersByCount(posts: Post[] = allPosts): PropertyCount[] {
	return countTerms(posts.flatMap((post) => (post.publisher ? [post.publisher] : [])));
}

/**
 * Counts how often two topics are used together. Only combinations that occur in more than
 * one post are returned.
 */
export function getTagCombinationsByCount(posts: Post[] = allPosts): TagCombination[] {
	const combinations = new Map<string, TagCombination>();

	for (const post of posts) {
		const topics = [...post.topics].sort((a, b) => a.slug.localeCompare(b.slug));
		for (let i = 0; i < topics.length; i++) {
			for (let j = i + 1; j < topics.length; j++) {
				const [a, b] = [topics[i], topics[j]];
				const key = `${a.slug},${b.slug}`;
				const entry = combinations.get(key);
				if (entry) {
					entry.count += 1;
				} else {
					combinations.set(key, { count: 1, labels: [a.label, b.label], slugs: [a.slug, b.slug] });
				}
			}
		}
	}

	return Array.from(combinations.values())
		.filter(({ count }) => count > 1)
		.sort((a, b) => b.count - a.count);
}

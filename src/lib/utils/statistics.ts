import posts from '$posts';

export type TagCount = {
	count: number;
	label: string;
	slug: string;
};

export function getTagsByCount(): TagCount[] {
	const tags = new Map<string, TagCount>();

	for (const post of posts) {
		for (const { slug, label } of post.topics) {
			if (tags.has(slug)) {
				tags.get(slug)!.count += 1;
			} else {
				tags.set(slug, { count: 1, label, slug });
			}
		}
	}

	return Array.from(tags.values()).sort((a, b) => b.count - a.count);
}

export type TagCombination = {
	count: number;
	labels: [string, string];
	slugs: [string, string];
};

export function getTagCombinationsByCount(): TagCombination[] {
	const combinations = new Map<string, TagCombination>();

	for (const post of posts) {
		for (const { slug: slug1, label: label1 } of post.topics) {
			for (const { slug: slug2, label: label2 } of post.topics) {
				if (slug1 !== slug2) {
					const key = [slug1, slug2].sort().join(',');
					if (combinations.has(key)) {
						combinations.get(key)!.count += 1;
					} else {
						combinations.set(key, { count: 0, labels: [label1, label2], slugs: [slug1, slug2] });
					}
				}
			}
		}
	}

	return Array.from(combinations.values())
		.filter(({ count }) => count > 1)
		.sort((a, b) => b.count - a.count);
}

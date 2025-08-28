import posts from '$posts';

export type PropertyCount = {
	count: number;
	label: string;
	slug: string;
};

function getPropertyByCount(key: string): PropertyCount[] {
	const tags = new Map<string, PropertyCount>();

	for (const post of posts) {
		if (Array.isArray(post[key])) {
			for (const { slug, label } of post[key]) {
				if (tags.has(slug)) {
					tags.get(slug)!.count += 1;
				} else {
					tags.set(slug, { count: 1, label, slug });
				}
			}
		} else if (typeof post[key] === 'object') {
			const { slug, label } = post[key];
			if (tags.has(slug)) {
				tags.get(slug)!.count += 1;
			} else {
				tags.set(slug, { count: 1, label, slug });
			}
		}
	}

	return Array.from(tags.values()).sort((a, b) => {
		if (a.count === b.count) {
			return a.label.localeCompare(b.label);
		}
		return b.count - a.count;
	});
}

export function getTagsByCount(): PropertyCount[] {
	return getPropertyByCount('topics');
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

export function getFormatsByCount(): PropertyCount[] {
	return getPropertyByCount('formats');
}

export function getAuthorsByCount(): PropertyCount[] {
	return getPropertyByCount('authors');
}

export function getPublishersByCount(): PropertyCount[] {
	return getPropertyByCount('publisher');
}

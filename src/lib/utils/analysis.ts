import posts from '$posts';

export function getTagsByCount() {
	const tags = posts.reduce((acc, post) => {
		post.topics.forEach(({ slug, label }) => {
			if (Object.hasOwn(acc, slug)) {
				acc[slug].count += 1;
			} else {
				acc[slug] = { count: 1, label };
			}
		});
		return acc;
	}, {});
	return Object.entries(tags).sort((a, b) => b[1].count - a[1].count);
}

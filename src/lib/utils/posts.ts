import posts from '$posts';

const POSTS_PER_PAGE = 20;

export function getCurrentPosts(
	page: string | number,
	isFavorite: boolean = false,
	lang: string | undefined
) {
	let data = posts;
	if (isFavorite) {
		data = data.filter((post) => post.isFavorite);
	}
	if (lang) {
		data = data.filter((post) => post.language?.key === lang);
	}
	const offset = (typeof page === 'number' ? page : parseInt(page ?? 1)) - 1;
	data = data.slice(offset * POSTS_PER_PAGE, offset * POSTS_PER_PAGE + POSTS_PER_PAGE);
	return data;
}

export function getPostBySlug(slug: string) {
	return posts.find((post) => post.slug === slug);
}

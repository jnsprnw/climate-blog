import posts from '$posts';

const POSTS_PER_PAGE = 5;

export function getCurrentPosts(
	page: string,
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
	const offset = parseInt(page ?? 1) - 1;
	data = data.slice(offset * POSTS_PER_PAGE, offset * POSTS_PER_PAGE + POSTS_PER_PAGE);
	return data;
}

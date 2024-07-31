import posts from '$posts';
import { POSTS_PER_PAGE } from '$config';

export function getPostsCount() {
	return posts.length;
}

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

type Page = {
	label: string;
	path: string | undefined;
	isCurrent: boolean;
};

export function getPageList(posts_total: number, currentIndex: string) {
	const pages_count = Math.ceil(posts_total / POSTS_PER_PAGE);
	const page_list: Page[] = [];
	for (let i = 1; i <= pages_count; i++) {
		let label = String(i);
		let isCurrent = false;
		if (String(i - 1) === currentIndex) {
			isCurrent = true;
		}
		if (i === 1) {
			label = 'First page';
		} else if (i === pages_count) {
			label = 'Last page';
		}
		page_list.push({ label, path: i === 1 ? undefined : String(i), isCurrent });
	}
	return page_list;
}

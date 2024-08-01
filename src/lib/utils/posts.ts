import posts from '$posts';
import { POSTS_PER_PAGE } from '$config';

export function getPostsCount() {
	return posts.length;
}

export function getCurrentPosts(
	page_number: number,
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
	data = data.slice((page_number - 1) * POSTS_PER_PAGE, page_number * POSTS_PER_PAGE);
	return data;
}

export function getPostBySlug(slug: string) {
	return posts.find((post) => post.slug === slug);
}

type Page = {
	label: string;
	path: string | undefined;
	isCurrent: boolean;
	isPrev: boolean;
	isNext: boolean;
};

export function getPagination(posts_total: number, currentIndex: number) {
	const pages_count = Math.ceil(posts_total / POSTS_PER_PAGE);
	const page_list: Page[] = [];
	const next = currentIndex + 1;
	const prev = currentIndex - 1;
	for (let i = 1; i <= pages_count; i++) {
		let label = String(i);
		let isCurrent = false;
		let isPrev = false;
		let isNext = false;
		if (i === currentIndex) {
			isCurrent = true;
		} else if (i === next) {
			isNext = true;
		} else if (i === prev) {
			isPrev = true;
		}
		if (i === 1) {
			label = 'First page';
		} else if (i === pages_count) {
			label = 'Last page';
		}
		page_list.push({ label, path: i === 1 ? undefined : String(i), isCurrent, isPrev, isNext });
	}

	return {
		list: page_list,
		count: pages_count,
		next: pages_count < next ? undefined : next,
		prev: prev < 0 ? undefined : prev
	};
}

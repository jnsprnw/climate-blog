import posts from '$posts';
import {
	POSTS_PER_PAGE,
	SITE_DESCRIPTION,
	STRING_PLACEHOLDER,
	LANGUAGES,
	KEY_FAVORITE
} from '$config';
import type { Post } from '$types/pocketbase';
import { maxBy, range } from 'lodash-es';

export function getPostsCount() {
	return posts.length;
}

export function getAllSlugs() {
	return posts.map(({ slug }) => slug);
}

export function checkPostSlug(slug: string) {
	return posts.some((post) => post.slug === slug);
}

function getPostsForFilter(isFavorite: boolean = false, lang: string | undefined): Post[] {
	let data = posts;
	if (isFavorite) {
		data = data.filter((post) => post.isFavorite);
	}
	if (lang) {
		data = data.filter((post) => post.language?.key === lang);
	}
	return data;
}

export function getCurrentPosts(
	page_number: number,
	isFavorite: boolean = false,
	lang: string | undefined
): Post[] {
	let data = getPostsForFilter(isFavorite, lang);
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

function getPageCountForPosts(posts_total: number): number {
	return Math.ceil(posts_total / POSTS_PER_PAGE);
}

export function getPagination(posts_total: number, currentIndex: number) {
	const pages_count = getPageCountForPosts(posts_total);
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

export function getLastMod(arr: Post[]): string | undefined {
	if (Array.isArray(arr) && typeof arr !== 'undefined' && arr.length > 0) {
		return maxBy(arr, (d) => new Date(d.updated))?.updated ?? undefined;
	}
	return undefined;
}

export function getPageDescription() {
	return SITE_DESCRIPTION.replace(STRING_PLACEHOLDER, String(getPostsCount()));
}

export function getPaginationPages() {
	console.log('here');
	return [undefined, ...LANGUAGES].flatMap((lang) =>
		[true, false].flatMap((favorite) => {
			const posts = getPostsForFilter(favorite, lang);
			const page_count = getPageCountForPosts(posts.length);
			return range(1, page_count + 1).map((count) => {
				const page_posts = getCurrentPosts(count, favorite, lang);
				const lastMod = getLastMod(page_posts);
				return {
					page: String(count),
					// page_count,
					// count: posts.length,
					favorite: favorite ? KEY_FAVORITE : undefined,
					lang,
					lastMod
				};
			});
		})
	);
}

export function getPaginationEntries() {
	return getPaginationPages().map(({ page, lang, favorite }) => ({
		page,
		...(lang && { lang }),
		...(favorite && { favorite })
	}));
}

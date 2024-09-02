import { getPostBySlug } from '$utils/posts';

export async function load({ params, url }) {
	const { slug } = params;
	const lightMode = url.searchParams.has('light');
	return {
		post: getPostBySlug(slug),
		type: 'article',
		path: slug,
		lightMode
	};
}

export const prerender = true;

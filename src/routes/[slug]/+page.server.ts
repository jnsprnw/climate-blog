import { getPostBySlug } from '$utils/posts';

export async function load({ params }) {
	const { slug } = params;
	return {
		post: getPostBySlug(slug),
		type: 'article',
		path: slug
	};
}

export const prerender = true;

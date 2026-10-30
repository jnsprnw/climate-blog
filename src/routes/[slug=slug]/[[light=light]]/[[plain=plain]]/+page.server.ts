import { error } from '@sveltejs/kit';
import { KEY_MODE_LIGHT, KEY_MODE_PLAIN } from '#config';
import { getPostBySlug, getAllSlugs, hasImage } from '#utils/posts';
import { getEntriesList } from '#utils/url';
import type { EntryGenerator, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const post = getPostBySlug(slug);

	if (!post) {
		error(404, 'Not found');
	}

	return {
		post,
		type: 'article',
		path: slug,
		preconnectImage: hasImage(post)
	};
};

export const entries: EntryGenerator = () => {
	return getEntriesList(
		getAllSlugs().map((slug) => ({ slug })),
		[KEY_MODE_LIGHT, KEY_MODE_PLAIN]
	);
};

export const prerender = true;

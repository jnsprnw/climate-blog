import {
	getLanguages,
	getAuthors,
	getFormats,
	getPosts,
	getSchemas,
	getTopics,
	getPublishers,
	getReferences
} from './pocketbase';
import { writeFile, slugify } from './utils';
import { getImageDetails } from './cloudinary';
import { truncate } from 'lodash-es';
import { type Post } from '$types/pocketbase';

function compare(p1: Post, p2: Post, key: string) {
	const e1 = p1[key];
	const e2 = p2[key];
	if (Array.isArray(e1)) {
		return e1.some((e) => e2.includes(e));
	} else {
		return e1 === e2;
	}
}

function getRelatedPosts(current_post: Post, all_posts: Post[], key: string) {
	return all_posts
		.filter((p) => compare(p, current_post, key) && p.id !== current_post.id)
		.map((p) => [p.title, p.slug]);
}

async function getData() {
	const authors = await getAuthors();
	// console.log(authors);
	const formats = await getFormats();
	// console.log(formats);
	const languages = await getLanguages();
	// console.log(languages);
	const topics = await getTopics();
	// console.log({ topics });
	const schemas = await getSchemas();
	const publishers = await getPublishers();
	const references = await getReferences();

	let posts = await getPosts();
	posts = posts.map((post) => ({
		...post,
		slug:
			post.slug ??
			truncate(slugify(post.title_short ?? post.title), {
				length: 60,
				separator: '-'
			}) // We shorten the slug to make shorter urls
	}));
	const entries = await Promise.all(
		posts.map(async (post) => {
			const image = post.image
				? await getImageDetails(post.image, post.image_caption, post.image_alt)
				: null;
			return {
				...post,
				language: languages.get(post.language),
				schemas: schemas.get(post.schemas),
				publisher: publishers.get(post.publisher),
				reference: references.get(post.reference),
				formats: post.formats.map((key: string) => formats.get(key)),
				authors: post.authors.map((key: string) => authors.get(key)),
				topics: post.tags.map((key: string) => topics.get(key)),
				image,
				quote_content: post.quote,
				quote_author: post.quote_author,
				related: {
					publisher: getRelatedPosts(post, posts, 'publisher'),
					formats: getRelatedPosts(post, posts, 'formats'),
					authors: getRelatedPosts(post, posts, 'authors'),
					tags: getRelatedPosts(post, posts, 'tags')
				}
			};
		})
	);
	writeFile('posts', entries);
}

getData();

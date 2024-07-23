import {
	getLanguages,
	getAuthors,
	getFormats,
	getPosts,
	getSchemas,
	getTopics,
	getPublishers
} from './pocketbase';
import { writeFile, slugify } from './utils';
import { getImageDetails } from './cloudinary';

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

	const posts = await getPosts();
	const entries = await Promise.all(
		posts.map(async (post) => {
			const image = post.image ? await getImageDetails(post.image, post.caption) : null;
			return {
				...post,
				slug: slugify(post.title),
				language: languages.get(post.language),
				schemas: schemas.get(post.schemas),
				publisher: publishers.get(post.publisher),
				formats: post.formats.map((key: string) => formats.get(key)),
				authors: post.authors.map((key: string) => authors.get(key)),
				topics: post.tags.map((key: string) => topics.get(key)),
				image
			};
		})
	);
	writeFile('posts', entries);
}

getData();

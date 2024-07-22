import { getLanguages, getAuthors, getFormats, getPosts } from './pocketbase';
import { writeFile, slugify } from './utils';
import { getImageDetails } from './cloudinary';

async function getData() {
	// const authors = await getAuthors();
	// console.log(authors);
	// const formats = await getFormats();
	// console.log(formats);
	const languages = await getLanguages();
	console.log(languages);

	const posts = await getPosts();
	const entries = await Promise.all(
		posts.map(async (post) => {
			const image = post.image ? await getImageDetails(post.image, post.caption) : null;
			return {
				...post,
				slug: slugify(post.title),
				language: languages.get(post.language),
				image
			};
		})
	);
	writeFile('posts', entries);
}

getData();

import { getLanguages, getAuthors, getFormats, getPosts } from './pocketbase';
import { writeFile } from './utils';

async function getData() {
	// const authors = await getAuthors();
	// console.log(authors);
	// const formats = await getFormats();
	// console.log(formats);
	const languages = await getLanguages();
	console.log(languages);

	const posts = await getPosts();
	const entries = posts.map((post) => {
		return {
			...post,
			language: languages.get(post.language)
		};
	});
	writeFile('posts', entries);
}

getData();

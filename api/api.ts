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
import { truncate, intersection } from 'lodash-es';
import type { PostsRecord } from '../src/types/pocketbase-types';

function compare(p1: PostsRecord, p2: PostsRecord, key: string) {
	const e1 = p1[key];
	const e2 = p2[key];
	if (Array.isArray(e1)) {
		return e1.some((e) => e2.includes(e));
	} else {
		return e1 === e2;
	}
}

function getRelationship(current_post: PostsRecord, all_posts: PostsRecord[], dimensions) {
	const relationships_list = Object.keys(dimensions)
		.map((key) => {
			const related_posts = all_posts
				.filter((post) => post.id !== current_post.id) // Filter out the current post
				.map((post) => [post.id, key, intersection(post[key], current_post[key])]) // Map each post to an array containing the intersection length and the post ID
				.filter((intersection) => intersection[2].length > 0) // Filter out empty intersections
				.sort((a, b) => b[2].length - a[2].length); // Sort by intersection length
			return related_posts;
		})
		.flat();

	const edges = Object.entries(Object.groupBy(relationships_list, (edge) => edge[0])).map(
		([id, relationships]) => {
			const post = all_posts.find((post) => post.id === id);
			return {
				slug: post.slug,
				id: post.id,
				title: post.title,
				count: relationships
					.map(([_, key, edges]) => edges.length * dimensions[key].weight)
					.reduce((acc, curr) => acc + curr, 0),
				relationships: relationships.map(([_, key, edges]) => [
					key,
					edges.map((edge) => dimensions[key].list.get(edge))
				])
			};
		}
	);
	return edges.sort((a, b) => b.count - a.count);
}

function getRelatedPosts(current_post: PostsRecord, all_posts: PostsRecord[], key: string) {
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
	posts = posts.map((post: PostsRecord) => {
		const has_predefined_slug = Boolean(post.slug.length);
		if (!post.title_short.length) {
			delete post.title_short;
		}
		return {
			...post,
			slug: has_predefined_slug
				? post.slug
				: truncate(slugify(post.title_short ?? post.title), {
						length: 60,
						separator: '-'
					}) // We shorten the slug to make shorter urls
		};
	});
	const entries = await Promise.all(
		posts.map(async (post) => {
			const image = post.image
				? await getImageDetails(
						post.image,
						post.image_caption,
						post.image_alt,
						post.image_source_url,
						post.image_source_label
					)
				: null;
			delete post.image_caption;
			delete post.image_alt;
			// console.log(
			// 	getRelationship(post, posts, {
			// 		authors: authors,
			// 		formats: formats,
			// 		tags: topics,
			// 		publishers: publishers
			// 	})
			// );
			// console.log(post.formats.map((key: string) => formats.get(key)));
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
				quote_source_label: post.quote_source_label,
				quote_source_url: post.quote_source_url,
				related: {
					publisher: getRelatedPosts(post, posts, 'publisher'),
					formats: getRelatedPosts(post, posts, 'formats'),
					authors: getRelatedPosts(post, posts, 'authors'),
					tags: getRelatedPosts(post, posts, 'tags')
				},
				relationships: getRelationship(post, posts, {
					authors: { list: authors, weight: 1 },
					formats: { list: formats, weight: 0.25 },
					tags: { list: topics, weight: 0.75 },
					publishers: { list: publishers, weight: 0.5 }
				})
			};
		})
	);
	writeFile('posts', entries);
	console.log(`${entries.length} entries written to posts.json`);
	getNetworkData(entries);
}

type Entity = { id: string; title: string; type: string; weight: number; date?: Date };
type Link = { source: string; target: string; weight: number };

function getNetworkData(entries) {
	const entities = new Map<string, Entity>();
	const links = new Map<string, Link>();

	for (const entry of entries) {
		const post_id = `post-${entry.id}`;
		entities.set(post_id, {
			id: post_id,
			title: entry.title,
			type: 'post',
			weight: 1,
			date: entry.published
		});

		for (const relationship of entry.relationships) {
			const relationship_id = `post-${relationship.id}`;
			const link_id = [post_id, relationship_id].sort().join('-');
			if (!links.has(link_id)) {
				links.set(`${post_id}-${relationship}`, {
					source: post_id,
					target: relationship_id,
					weight: 1
				});
			} else {
				links.get(link_id)!.weight += 1;
			}
		}

		if (typeof entry.publisher !== 'undefined') {
			const publisher_id = `publisher-${entry.publisher.slug}`;
			if (!entities.has(publisher_id)) {
				entities.set(publisher_id, {
					id: publisher_id,
					title: entry.publisher.label,
					type: 'publisher',
					weight: 1
				});
			} else {
				entities.get(publisher_id)!.weight += 1;
			}
			links.set(`${post_id}-${publisher_id}`, {
				source: post_id,
				target: publisher_id,
				weight: 1
			});
		}

		for (const author of entry.authors) {
			const author_id = `author-${author.slug}`;
			if (!entities.has(author_id)) {
				entities.set(author_id, {
					id: author_id,
					title: author.label,
					type: 'author',
					weight: 1
				});
			} else {
				entities.get(author_id)!.weight += 1;
			}
			links.set(`${post_id}-${author_id}`, {
				source: post_id,
				target: author_id,
				weight: 1
			});
		}

		for (const topic of entry.topics) {
			const topic_id = `topic-${topic.slug}`;

			if (!entities.has(topic_id)) {
				entities.set(topic_id, {
					id: topic_id,
					title: topic.label,
					type: 'topic',
					weight: 1
				});
			} else {
				entities.get(topic_id)!.weight += 1;
			}
			links.set(`${post_id}-${topic_id}`, {
				source: post_id,
				target: topic_id,
				weight: 1
			});
		}
	}

	writeFile('entities', Array.from(entities.values()));
	writeFile('links', Array.from(links.values()));
}

getData();

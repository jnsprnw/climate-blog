import PocketBase from 'pocketbase';
import { createMap } from './utils';
import { TypedPocketBase } from '../src/types/pocketbase-types';

const client = new PocketBase(Bun.env.POCKETBASE_URL) as TypedPocketBase;
client.autoCancellation(false);

export async function getCollection(collection: string) {
	return await client.collection(collection).getFullList({
		sort: '-created'
	});
}

export async function getPosts() {
	return await client.collection('posts').getFullList({
		sort: '-published',
		filter: 'published!=""'
	});
}

export async function getCollectionMap(
	collection_id: string,
	label_key: string = 'label',
	additional_keys: string[] = []
) {
	const list = await getCollection(collection_id);
	return createMap(list, label_key, additional_keys);
}

export async function getAuthors() {
	return await getCollectionMap('authors', 'name');
}

export async function getFormats() {
	return await getCollectionMap('formats');
}

export async function getPublishers() {
	return await getCollectionMap('publishers');
}

export async function getLanguages() {
	return await getCollectionMap('languages', 'label', ['key']);
}

export async function getReferences() {
	return await getCollectionMap('references');
}

export async function getSchemas() {
	return await getCollectionMap('schemas', 'label', ['key']);
}

export async function getTopics() {
	return await getCollectionMap('topics');
}

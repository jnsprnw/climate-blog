import { kebabCase } from 'lodash-es';

export function slugify(str: string) {
	return kebabCase(str);
}

export function createMap(arr, key: string = 'label', keys: string[] = []) {
	const map = new Map();
	arr.forEach((item) => {
		const { id, [key]: label } = item;
		const obj = { label, slug: slugify(label) };
		keys.forEach((k) => (obj[k] = item[k]));
		map.set(id, obj);
	});
	return map;
}

export async function writeFile(file: string, data) {
	await Bun.write(`src/data/${file}.json`, JSON.stringify(data, null, 2));
}

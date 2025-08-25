import { getTagsByCount } from '$utils/analysis';

/** @type {import('./$types').PageLoad} */
export async function load() {
	console.log(getTagsByCount());
	return {
		tags: getTagsByCount()
	};
}

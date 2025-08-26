import { getTagsByCount } from '$utils/analysis';

/** @type {import('./$types').PageLoad} */
export async function load() {
	return {
		tags: getTagsByCount()
	};
}

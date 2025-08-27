import { getTagsByCount, getTagCombinationsByCount } from '$utils/statistics';

/** @type {import('./$types').PageLoad} */
export async function load() {
	return {
		tags: getTagsByCount(),
		combinations: getTagCombinationsByCount()
	};
}

import {
	getTagsByCount,
	getTagCombinationsByCount,
	getFormatsByCount,
	getPublishersByCount,
	getAuthorsByCount
} from '$utils/statistics';

/** @type {import('./$types').PageLoad} */
export async function load() {
	return {
		tags: getTagsByCount(),
		combinations: getTagCombinationsByCount(),
		formats: getFormatsByCount(),
		publishers: getPublishersByCount(),
		authors: getAuthorsByCount(),
		title: 'Statistics',
		is_wide: true
	};
}

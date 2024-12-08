import { STR_FAVORITE } from '$config';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	// console.log('favorite', { param }, param === STR_FAVORITE);
	return param === STR_FAVORITE;
}

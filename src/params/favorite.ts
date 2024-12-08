import { STR_FAVORITE } from '$config';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
	return param === KEY_FAVORITE;
}

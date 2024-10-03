import { KEY_ALL_POSTS } from '$config';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	return param === KEY_ALL_POSTS || /^\d+$/.test(param);
}

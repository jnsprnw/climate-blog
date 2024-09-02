import { KEY_LIGHTMODE } from '$config';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
	return param === KEY_LIGHTMODE;
}

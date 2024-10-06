import { KEY_MODE_PLAIN } from '$config';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
	return param === KEY_MODE_PLAIN;
}

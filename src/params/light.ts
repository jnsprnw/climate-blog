import { KEY_MODE_LIGHT } from '$config';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
	return param === KEY_MODE_LIGHT;
}

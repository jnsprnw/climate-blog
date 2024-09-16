import { LANGUAGES } from '$config';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
	return LANGUAGES.includes(param);
}

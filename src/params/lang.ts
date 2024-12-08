import { LANGUAGES } from '$config';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	// console.log('lang', { param }, LANGUAGES.includes(param));
	return LANGUAGES.includes(param);
}

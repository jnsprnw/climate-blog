import { KEY_MODE_PLAIN } from '$config';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	// console.log('plain', { param }, param === KEY_MODE_PLAIN);
	return param === KEY_MODE_PLAIN;
}

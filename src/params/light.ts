import { KEY_MODE_LIGHT } from '$config';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	// console.log('light', { param }, param === KEY_MODE_LIGHT);
	return param === KEY_MODE_LIGHT;
}

import { KEY_LIGHTMODE } from '$config';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
	console.log('param:', param, param === KEY_LIGHTMODE, Boolean(param === KEY_LIGHTMODE));
	return param === KEY_LIGHTMODE;
}

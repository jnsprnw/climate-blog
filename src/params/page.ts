/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	console.log('Page:', param, Boolean(param.match(/^\d+$/)));
	return param.match(/^\d+$/);
}

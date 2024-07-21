/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
	return ['de', 'en'].includes(param);
}

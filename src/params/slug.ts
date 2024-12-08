import { checkPostSlug } from '$utils/posts';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	// console.log('slug', { param }, checkPostSlug(param));
	return checkPostSlug(param);
}

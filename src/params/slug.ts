import { checkPostSlug } from '$utils/posts';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
	console.log('Slug', checkPostSlug(param));
	return checkPostSlug(param);
}

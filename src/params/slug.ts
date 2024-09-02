import { checkPostSlug } from '$utils/posts';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
	return checkPostSlug(param);
}

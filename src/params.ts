import { defineParams } from '@sveltejs/kit/params';
import { STR_FAVORITE, KEY_MODE_LIGHT, KEY_ALL_POSTS, KEY_MODE_PLAIN } from '#config';
import { checkPostSlug, isLang } from '#utils/posts';

function matchIf(predicate: (param: string) => boolean) {
	return (param: string) => (predicate(param) ? param : undefined);
}

export const params = defineParams({
	favorite: matchIf((param) => param === STR_FAVORITE),
	lang: matchIf(isLang),
	light: matchIf((param) => param === KEY_MODE_LIGHT),
	page: matchIf((param) => param === KEY_ALL_POSTS || /^[1-9]\d*$/.test(param)),
	plain: matchIf((param) => param === KEY_MODE_PLAIN),
	slug: matchIf(checkPostSlug)
});

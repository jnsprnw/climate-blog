import { defineParams } from '@sveltejs/kit/params';
import { STR_FAVORITE, LANGUAGES, KEY_MODE_LIGHT, KEY_ALL_POSTS, KEY_MODE_PLAIN } from '#config';
import { checkPostSlug } from '#utils/posts';

function matchFavorite(param: string) {
	// console.log('favorite', { param }, param === STR_FAVORITE);
	return param === STR_FAVORITE;
}

function matchLang(param: string) {
	// console.log('lang', { param }, LANGUAGES.includes(param));
	return LANGUAGES.includes(param);
}

function matchLight(param: string) {
	// console.log('light', { param }, param === KEY_MODE_LIGHT);
	return param === KEY_MODE_LIGHT;
}

function matchPage(param: string) {
	// console.log('page', { param }, param === KEY_ALL_POSTS || /^\d+$/.test(param));
	return param === KEY_ALL_POSTS || /^\d+$/.test(param);
}

function matchPlain(param: string) {
	// console.log('plain', { param }, param === KEY_MODE_PLAIN);
	return param === KEY_MODE_PLAIN;
}

function matchSlug(param: string) {
	// console.log('slug', { param }, checkPostSlug(param));
	return checkPostSlug(param);
}

export const params = defineParams({
	favorite: (param) => (matchFavorite(param) ? param : undefined),
	lang: (param) => (matchLang(param) ? param : undefined),
	light: (param) => (matchLight(param) ? param : undefined),
	page: (param) => (matchPage(param) ? param : undefined),
	plain: (param) => (matchPlain(param) ? param : undefined),
	slug: (param) => (matchSlug(param) ? param : undefined)
});

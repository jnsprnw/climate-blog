import { dev } from '$app/environment';
import { PUBLIC_PAGE_URL } from '$env/static/public';
import { KEY_MODE_LIGHT } from '$config';
import type { IsModeLight } from '$types/types';

export function getAbsoluteURLWithLightMode(path: string = ''): string {
	return getAbsoluteURL(path, true);
}

export function getAbsoluteURL(path: string = '', isModeLight: IsModeLight = false): string {
	return getURL(path, isModeLight).toString();
}

export function getRelativeURL(path: string = '', isModeLight: IsModeLight = false): string {
	return getURL(path, isModeLight).pathname;
}

function getURL(path: string = '', isModeLight: IsModeLight = false): URL {
	return new URL(
		(path + (isModeLight ? '/light' : '')).replace('//', '/'),
		dev ? 'http://localhost:5173' : PUBLIC_PAGE_URL
	);
}

const FAVORITE_STR = 'favorite';

export function checkFavorite(favorite: string): boolean {
	return favorite === FAVORITE_STR;
}

export function generateFeedURL(lang: string, isFavorite: boolean): string {
	return getAbsoluteURL(
		[lang, isFavorite ? FAVORITE_STR : null, 'rss.xml'].filter(Boolean).join('/')
	);
}

export function getEntriesList(arr) {
	return arr.flatMap((entry) => [
		Object.assign({}, entry, { light: '' }),
		Object.assign({}, entry, { light: KEY_MODE_LIGHT })
	]);
}

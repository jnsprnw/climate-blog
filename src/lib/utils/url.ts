import { dev } from '$app/environment';
import { PUBLIC_PAGE_URL } from '$env/static/public';
import { KEY_LIGHTMODE } from '$config';

export function getAbsoluteURLWithLightMode(path: string = ''): string {
	return getAbsoluteURL(path, true);
}

export function getAbsoluteURL(path: string = '', isLightMode: boolean = false): string {
	return getURL(path, isLightMode).toString();
}

export function getRelativeURL(path: string = '', isLightMode: boolean = false): string {
	return getURL(path, isLightMode).pathname;
}

function getURL(path: string = '', isLightMode: boolean = false): URL {
	return new URL(
		(path + (isLightMode ? '/light' : '')).replace('//', '/'),
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
		Object.assign({}, entry, { light: KEY_LIGHTMODE })
	]);
}

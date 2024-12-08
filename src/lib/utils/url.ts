import { dev } from '$app/environment';
import { PUBLIC_PAGE_URL } from '$env/static/public';
import { KEY_MODE_LIGHT, STR_FAVORITE, KEY_MODE_PLAIN } from '$config';
import type { IsModeLight } from '$types/ui';

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

export function checkFavorite(favorite: string): boolean {
	return favorite === STR_FAVORITE;
}

export function generateFeedURL(lang: string, isFavorite: boolean): string {
	return getAbsoluteURL(
		[lang, isFavorite ? STR_FAVORITE : null, 'rss.xml'].filter(Boolean).join('/')
	);
}

export function getEntriesList(arr) {
	return [true, false].flatMap((light) => {
		return [true, false].flatMap((plain) => {
			return arr.flatMap((entry) =>
				Object.assign({}, entry, {
					[KEY_MODE_LIGHT]: light ? KEY_MODE_LIGHT : '',
					[KEY_MODE_PLAIN]: plain ? KEY_MODE_PLAIN : ''
				})
			);
		});
	});
}

import { dev } from '$app/environment';
import { PUBLIC_PAGE_URL } from '$env/static/public';

export function getAbsoluteURLWithLightMode(path: string = ''): string {
	return getAbsoluteURL(path, true);
}

export function getAbsoluteURL(path: string = '', isLightMode: boolean = false): string {
	console.log(path, isLightMode);
	return new URL(
		(path + (isLightMode ? '/light' : '')).replace('//', '/'),
		dev ? 'http://localhost:5173' : PUBLIC_PAGE_URL
	).toString();
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

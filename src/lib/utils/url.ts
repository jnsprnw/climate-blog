import { dev } from '$app/environment';
import { PAGE_URL } from '$env/static/private';

export function getAbsoluteURL(path: string = ''): string {
	return new URL(path, dev ? 'http://localhost:5173' : PAGE_URL).toString();
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
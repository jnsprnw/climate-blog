import { dev } from '$app/env';
import { PUBLIC_PAGE_URL } from '$app/env/public';
import { KEY_MODE_LIGHT, STR_FAVORITE, KEY_MODE_PLAIN } from '#config';
import type { IsModeLight } from '#types/ui';

const BASE_URL = dev ? 'http://localhost:5173' : PUBLIC_PAGE_URL;

export function getAbsoluteURL(path: string = '', isModeLight: IsModeLight = false): string {
	return getURL(path, isModeLight).toString();
}

export function getRelativeURL(path: string = '', isModeLight: IsModeLight = false): string {
	return getURL(path, isModeLight).pathname;
}

export function getURL(
	path: string = '',
	isModeLight: IsModeLight = false,
	base: string = BASE_URL
): URL {
	const segments = path.split('/').filter(Boolean);
	if (isModeLight) {
		segments.push(KEY_MODE_LIGHT);
	}
	return new URL(segments.join('/'), base);
}

export function checkFavorite(favorite: string | undefined): boolean {
	return favorite === STR_FAVORITE;
}

export function generateFeedURL(lang: string | undefined, isFavorite: boolean): string {
	return getAbsoluteURL(
		[lang, isFavorite ? STR_FAVORITE : undefined, 'rss.xml'].filter(Boolean).join('/')
	);
}

type Mode = typeof KEY_MODE_LIGHT | typeof KEY_MODE_PLAIN;

/**
 * Multiplies prerender entries with every combination of the given optional mode params.
 */
export function getEntriesList<T extends object, M extends Mode>(
	entries: T[],
	modes: M[]
): (T & Record<M, string>)[] {
	return modes.reduce<(T & Record<M, string>)[]>(
		(list, mode) =>
			list.flatMap((entry) => [
				{ ...entry, [mode]: '' },
				{ ...entry, [mode]: mode }
			]),
		entries as (T & Record<M, string>)[]
	);
}

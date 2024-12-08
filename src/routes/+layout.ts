import { dev } from '$app/environment';
import { KEY_MODE_LIGHT, KEY_MODE_PLAIN } from '$config';
import type { IsModeLight, IsModePlain } from '$types/types';

export async function load({ params }) {
	const isModeLight: IsModeLight = params.light === KEY_MODE_LIGHT;
	const isModePlain: IsModePlain = params.plain === KEY_MODE_PLAIN;
	return {
		buildDateTime: new Date(),
		isModeLight,
		isModePlain
	};
}

export const csr = dev;
export const prerender = true;

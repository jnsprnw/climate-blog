import { dev } from '$app/environment';
import { KEY_LIGHTMODE } from '$config';

export async function load({ params }) {
	console.log({ params });
	const { light } = params;
	const isLightMode = light === KEY_LIGHTMODE;
	return {
		buildDateTime: new Date(),
		isLightMode
	};
}

export const csr = dev;
export const prerender = true;

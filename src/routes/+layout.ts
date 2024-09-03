import { dev } from '$app/environment';
import { KEY_LIGHTMODE } from '$config';

export async function load({ params }) {
	const { light } = params;
	const isLightMode = light === KEY_LIGHTMODE;
	console.log('here layout', isLightMode);
	return {
		buildDateTime: new Date(),
		isLightMode
	};
}

export const csr = dev;
export const prerender = true;

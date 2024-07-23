import { dev } from '$app/environment';

export async function load() {
	return {
		buildDateTime: new Date()
	};
}

export const csr = dev;
export const prerender = true;

export async function load() {
	console.log('about page');
	return {
		path: 'about'
	};
}

export const prerender = true;

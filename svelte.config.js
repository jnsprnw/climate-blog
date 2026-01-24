import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$config: 'src/config.ts',
			$posts: 'src/data/posts.json',
			$entities: 'src/data/entities.json',
			$links: 'src/data/links.json',
			$types: 'src/types',
			$utils: 'src/lib/utils'
		},
		version: {
			name: process.env.npm_package_version
		}
	}
};

export default config;

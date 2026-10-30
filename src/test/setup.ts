import { mock } from 'bun:test';

// SvelteKit's virtual modules don't exist outside of Vite, so they are replaced for unit tests
mock.module('$app/env', () => ({ dev: false, browser: false, building: false, version: 'test' }));
mock.module('$app/env/public', () => ({ PUBLIC_PAGE_URL: 'https://example.com/' }));

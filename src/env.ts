import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({ PUBLIC_PAGE_URL: { public: true, static: true } });

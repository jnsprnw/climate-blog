fetch:
	bun ./api/api.ts

types:
	bunx pocketbase-typegen --env --out src/types/pocketbase-types.ts

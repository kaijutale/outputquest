// Vitest stub for the `server-only` package.
// `server-only` throws when imported outside a React Server Component graph,
// which breaks importing modules like `src/lib/cache-tags.ts` under Vitest.
// Aliased to this empty module in vitest.config.ts so such modules are testable.
export {};

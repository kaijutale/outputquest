import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	prettier,
	// Override default ignores of eslint-config-next + add project-specific ignores
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
		// Project-specific ignores:
		// Ignore auto-generated code (e.g., Prisma client & runtime) so ESLint
		// doesn't block builds with warnings we don't control.
		"src/generated/**",
	]),
]);

export default eslintConfig;

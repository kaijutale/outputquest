import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	{
		rules: {
			// React Compiler's new rule - currently overly strict with many false positives
			// (GitHub Issue #34743). Set to "warn" to monitor for future improvements.
			// Patterns like setMounted(true) in useEffect are officially recommended by React docs.
			"react-hooks/set-state-in-effect": "warn",
			// Ignore unused variables that start with underscore (common convention for intentionally unused vars)
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
		},
	},
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

/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	test: {
		alias: {
			"@": resolve(__dirname, "./src")
		},
		includeSource: ["src/**/*.{js,cjs,mjs,ts,cts,mts}"]
	}
});

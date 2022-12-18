module.exports = {
	parser: "@typescript-eslint/parser",
	root: true,
	env: {
		es2022: true,
		node: true
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	plugins: ["@typescript-eslint"],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest"
	}
};

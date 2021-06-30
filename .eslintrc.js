const warn = process.env.NODE_ENV === "development" ? "warn" : "error";

module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "no-console": warn,
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        "linebreak-style": ["error", "unix"],
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true,
            },
        ],
        semi: ["error", "always"],
        "comma-dangle": ["error", "always-multiline"],
        "@typescript-eslint/explicit-module-boundary-types": "off",
    },
};

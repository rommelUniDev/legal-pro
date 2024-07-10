module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "import",
    "sort-exports",
    "disable",
    "prettier",
    "fp",
  ],
  processor: "disable/disable",
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:fp/recommended",
  ],
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  ignorePatterns: [
    "**/*.js",
    "**/*.cjs",
    "**/*.mjs",
    "**/*.d.ts",
    "node_modules/",
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": [
      2,
      {
        args: "none",
        vars: "all",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          ["internal", "builtin", "external"],
          ["sibling", "parent", "index"],
          "type",
        ],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "@skorit/**",
            group: "internal",
          },
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "import/no-unresolved": "error",
  },
  overrides: [
    {
      files: ["**/__tests__/**/*"],
      settings: {
        "disable/plugins": ["fp"],
      },
    },
  ],
};

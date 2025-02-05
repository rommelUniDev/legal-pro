/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js", "@repo/eslint-config/standard.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "fp/no-rest-parameters": "off",
    "fp/no-mutation": "off",
  },
};

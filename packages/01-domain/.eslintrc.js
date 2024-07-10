module.exports = {
  extends: ["@repo/eslint-config/standard"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
    esmaVersion: "latest",
  },
};

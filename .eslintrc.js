module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["custom"],
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.test.js"],
      env: {
        jest: true,
      },
    },
  ],
};

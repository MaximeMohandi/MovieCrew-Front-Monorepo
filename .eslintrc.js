module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["custom"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./packages/*/tsconfig.json", "./apps/*/tsconfig.json"],
  },
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.test.js"],
      env: {
        jest: true,
      },
    },
  ],
  ignorePatterns: [
    "dist/", // Exclude the dist folder
    "**/*.d.ts", // Optionally exclude all .d.ts files if necessary
  ],
};

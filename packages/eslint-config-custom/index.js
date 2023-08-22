module.exports = {
  extends: [
    "eslint:recommended",
    "airbnb",
    "airbnb-typescript",
    "turbo",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "jest"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
      },
    },
  },
};

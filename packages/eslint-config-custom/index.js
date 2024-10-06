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

  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: ["**/**/tsconfig.json"],
      },
    },
  },
  rules: {
    "import/prefer-default-export": ["off", { target: "single" }],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "@typescript-eslint/return-await": "off"
  },
};

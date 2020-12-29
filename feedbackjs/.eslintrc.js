module.exports = {
  extends: [
    'uncley',
    'uncley/typescript'
  ],
  rules: {
    'prettier/prettier': ['error', {
      // printWidth: 100,
      trailingComma: 'none',
      tabWidth: 2,
      semi: false,
      singleQuote: true,
      quoteProps: 'as-needed',
      jsxSingleQuote: false,
      arrowParens: 'always',
      endOfLine: 'auto'
    }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    'no-unused-expressions': ['off']
  },
  globals: {
    'DefaultServer': true
  }
}
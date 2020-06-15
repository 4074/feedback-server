module.exports = {
    extends: [
        'uncley',
        'uncley/react', // Using if you using react.
        'uncley/typescript' // Using if you using typescript.
    ],
    rules: {
        // Write custom rules here.
        allowUnderscorePrefix: 0,
        '@typescript-eslint/camelcase': ['off', { properties: 'always' }],
        '@typescript-eslint/no-use-before-define': ['error', { 'functions': false, 'classes': false }],
        'import/named': 'off' // Turn it off because it does not support `export * as ns` that is a new feature of es2020.
    }
}
/* eslint-env node */
module.exports = {
    plugins: ['jest'],
    env: {
        browser: true,
        es2021: true,
        'jest/globals': true
    },
    extends: ['airbnb-base'],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        },
        {
            files: ['*.test.ts'],
            rules: {
                'max-lines': ['error', 500],
                'max-lines-per-function': ['error', 500]
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    ignorePatterns: ['vite.config.js'],
    rules: {
        semi: [2, 'never'],
        indent: ['error', 4],
        'comma-dangle': ['error', 'never'],
        'operator-linebreak': 0,
        'implicit-arrow-linebreak': 0,
        'function-paren-newline': 0,
        'max-lines': ['error', 243],
        'max-depth': ['error', 3],
        'max-lines-per-function': ['error', 35],
        'object-curly-newline': 0,
        'import/prefer-default-export': 0
    }
};
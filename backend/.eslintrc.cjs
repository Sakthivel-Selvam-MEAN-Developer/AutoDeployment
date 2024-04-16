/* eslint-env node */
module.exports = {
    plugins: ['@typescript-eslint'],
    env: {
        es2021: true
    },
    extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
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
                'max-lines': ['warn', 600],
                'max-lines-per-function': ['warn', 600],
                '@typescript-eslint/no-explicit-any': 'off'
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
        indent: 'off',
        'comma-dangle': ['error', 'never'],
        'operator-linebreak': 0,
        'implicit-arrow-linebreak': 0,
        'function-paren-newline': 0,
        'max-lines': ['error', 700],
        'max-depth': ['error', 3],
        'max-lines-per-function': ['warn', 10],
        'object-curly-newline': 0,
        'import/prefer-default-export': 0,
        radix: 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'consistent-return': 'off',
        complexity: ['warn', { max: 2 }]
    }
}

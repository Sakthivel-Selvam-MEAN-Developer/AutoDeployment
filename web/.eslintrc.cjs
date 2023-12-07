module.exports = {
    root: true,
    env: { browser: true, es2020: true, jest: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    overrides: [
        {
            files: ['*.test.tsx'],
            rules: {
                'max-lines': ['error', 500],
                'max-lines-per-function': ['error', 500],
                "@typescript-eslint/no-explicit-any": "off"
            }
        }
    ],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        semi: [2, 'never'],
        indent: 'off',
        'operator-linebreak': 0,
        'function-paren-newline': 0,
        'max-lines': ['warn', 50],
        'max-depth': ['error', 3],
        'max-lines-per-function': ['warn', 30],
        'import/prefer-default-export': 0,
        '@typescript-eslint/no-explicit-any': 'warn'
    }
}

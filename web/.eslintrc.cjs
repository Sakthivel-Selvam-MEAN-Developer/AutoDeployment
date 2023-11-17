module.exports = {
    root: true,
    env: { browser: true, es2020: true, jest: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        semi: [2, 'never'],
        indent: ['error', 4],
        'operator-linebreak': 0,
        'function-paren-newline': 0,
        'max-lines': ['warn', 50],
        'max-depth': ['error', 3],
        'max-lines-per-function': ['warn', 30],
        'import/prefer-default-export': 0,
        '@typescript-eslint/no-explicit-any': 'warn',
        "max-warnings" : 2
    }
}

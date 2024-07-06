import eslint from '@eslint/js'
import tslint from 'typescript-eslint'

export default [
    eslint.configs.recommended,
    ...tslint.configs.recommended,
    {
        files: ['**/*.ts'],
        linterOptions: { noInlineConfig: true },
        rules: {
            semi: [2, 'never'],
            indent: 'off',
            'comma-dangle': ['error', 'never'],
            'operator-linebreak': 0,
            'implicit-arrow-linebreak': 0,
            'function-paren-newline': 0,
            'max-lines': ['warn', 50],
            'max-depth': ['error', 3],
            'max-lines-per-function': ['warn', 10],
            'object-curly-newline': 0,
            'import/prefer-default-export': 0,
            radix: 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'consistent-return': 'off',
            complexity: ['warn', { max: 2 }]
        }
    },
    {
        files: ['**/*.test.ts'],
        linterOptions: { noInlineConfig: true },
        rules: {
            complexity: ['warn', 3],
            'max-lines': ['warn', 200],
            'max-lines-per-function': ['warn', 30],
            '@typescript-eslint/no-explicit-any': 'off'
        }
    }
]

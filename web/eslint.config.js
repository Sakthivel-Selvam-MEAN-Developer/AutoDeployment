import eslint from '@eslint/js'
import tslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import { fixupPluginRules } from '@eslint/compat'

export default [
    eslint.configs.recommended,
    ...tslint.configs.recommended,
    {
        linterOptions: { noInlineConfig: true },
        rules: {
            semi: [2, 'never'],
            indent: 'off',
            'operator-linebreak': 0,
            'function-paren-newline': 0,
            'max-lines': ['warn', 30],
            'max-depth': ['error', 3],
            'max-lines-per-function': ['warn', { max: 5, skipBlankLines: true }],
            'import/prefer-default-export': 0,
            '@typescript-eslint/no-explicit-any': 'warn',
            complexity: ['warn', { max: 2 }],
            'max-statements': ['warn', { max: 10 }]
        }
    },
    {
        languageOptions: {
            parserOptions: { ecmaFeatures: { jsx: true } },
            globals: { ...globals.browser },
        },
    },
    {
        files: ['**/*.tsx'],
        linterOptions: { noInlineConfig: true },
        plugins: {
            "react-refresh": reactRefresh,
            "react": react,
            "react-hooks": fixupPluginRules(reactHooks),
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...react.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'max-lines': ['warn', 50],
            'max-lines-per-function': ['warn', { max: 20, skipBlankLines: true }],
            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function'
                }
            ],
            'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
            'react/jsx-no-bind': [
                'error',
                {
                    allowArrowFunctions: true
                }
            ],
            'react/jsx-indent': ['off'],
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-max-depth': ['warn', { max: 2 }],
            'react/jsx-no-literals': 'off',
            'react/jsx-child-element-spacing': 'off',
            'react/jsx-newline': 'off',
            'react/jsx-pascal-case': ['warn']
        }
    },
    {
        files: ['*.test.tsx', '*.test.ts'],
        linterOptions: { noInlineConfig: true },
        rules: {
            'max-lines': ['error', 600],
            'max-lines-per-function': ['error', 500],
            '@typescript-eslint/no-explicit-any': 'off',
            'max-statements': ['warn', 50]
        }
    }
]

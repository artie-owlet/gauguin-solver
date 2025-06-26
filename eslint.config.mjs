// @ts-check

import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import perfectionist from 'eslint-plugin-perfectionist';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    stylistic.configs['all'],
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            perfectionist,
        },
        rules: {
            '@typescript-eslint/consistent-type-assertions': [
                'error',
                {
                    assertionStyle: 'angle-bracket',
                    objectLiteralTypeAssertions: 'never',
                },
            ],
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/explicit-member-accessibility': 'error',
            '@typescript-eslint/no-confusing-void-expression': [
                'error',
                {
                    ignoreArrowShorthand: true,
                },
            ],
            '@typescript-eslint/no-empty-function': [
                'error',
                {
                    allow: ['overrideMethods'],
                },
            ],
            '@typescript-eslint/no-empty-interface': [
                'error',
                {
                    allowSingleExtends: true,
                },
            ],
            '@typescript-eslint/no-shadow': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/restrict-template-expressions': [
                'error',
                {
                    allowBoolean: true,
                    allowNumber: true,
                },
            ],

            '@stylistic/array-bracket-newline': [
                'error',
                'consistent',
            ],
            '@stylistic/array-element-newline': [
                'error',
                {
                    consistent: true,
                    multiline: true,
                },
            ],
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/function-call-argument-newline': ['error', 'consistent'],
            '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
            '@stylistic/indent-binary-ops': ['error', 4],
            '@stylistic/lines-between-class-members': 'off',
            '@stylistic/max-len': [
                'error',
                {
                    code: 120,
                    ignoreComments: true,
                },
            ],
            '@stylistic/multiline-comment-style': 'off',
            '@stylistic/multiline-ternary': ['error', 'always-multiline'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/object-property-newline': [
                'error',
                {
                    allowAllPropertiesOnSameLine: true,
                },
            ],
            '@stylistic/quotes': [
                'error',
                'single',
                {
                    avoidEscape: true,
                },
            ],
            '@stylistic/quote-props': ['error', 'as-needed'],
            '@stylistic/padded-blocks': ['error', 'never'],
            '@stylistic/space-before-function-paren': ['error', 'never'],
            '@stylistic/newline-per-chained-call': [
                'error',
                {
                    ignoreChainWithDepth: 3,
                },
            ],

            'perfectionist/sort-imports': [
                'error',
                {
                    groups: [
                        ['builtin', 'builtin-type'],
                        ['external', 'external-type'],
                        ['parent', 'sibling', 'parent-type', 'sibling-type'],
                    ],
                },
            ],

            'no-console': 'error',
            'no-duplicate-imports': 'error',
        },
    },
    {
        files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
        ...tseslint.configs.disableTypeChecked,
    },
    {
        ignores: [
            '.pnp.cjs',
            '.pnp.loader.mjs',
        ],
    },
    {
        files: ['eslint.config.mjs'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig-base.json',
            },
        },
    },
    {
        files: ['src/components/*.ts'],
        rules: {
            '@typescript-eslint/no-extraneous-class': 'off',
            '@typescript-eslint/no-unsafe-declaration-merging': 'off',
        },
    },
);

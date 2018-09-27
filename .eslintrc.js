module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/essential',
        'plugin:vue/strongly-recommended',
        'plugin:vue/recommended',
        'plugin:vue/base'
    ],
    parserOptions: {
        'ecmaVersion': 6,
        'sourceType': "module"
    },
    env: {
        'node': true
    },
    rules: {
        'quotes': ['error', 'single'],
        'indent': ['error', 2],
        'linebreak-style': ['error', 'unix'],
        'semi': ['error', 'always'],
        'no-console': 'warn'
    }
};
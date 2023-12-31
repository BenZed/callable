/* eslint-env node */
module.exports = {
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['prettier', '@typescript-eslint'],
    rules: {
        'prettier/prettier': 'error'
    }
}

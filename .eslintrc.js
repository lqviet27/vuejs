module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'vue/no-unused-vars': 'warn',
    'vue/no-multiple-template-root': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
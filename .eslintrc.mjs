export default {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', // если используете Vue 3
  ],
  rules: {
    'unicorn/prefer-node-protocol': 'off',
  },
};

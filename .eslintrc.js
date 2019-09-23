module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jasmine: true
  },
  extends: ['tui/es6', 'plugin:prettier/recommended'],
  globals: {
    toastui: true,
    fixture: true
  }
};

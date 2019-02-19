// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 强制分号结尾
    "semi": [2, "always"],
    'operator-linebreak': [2, 'before'],
    'no-multiple-empty-lines': 1
    // 换行可以有两个空格缩进
    // "indent": ["error", 2],
    // "SwitchCase": 1
  }
}

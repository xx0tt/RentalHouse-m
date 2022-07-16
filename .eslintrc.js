module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'space-before-function-paren': 'off',
    '@vue/compiler-sfc': 'off',
    'no-use-before-define': 'off',
    'no-unused-expressions': 'off',
    'no-void': 'off',
    eqeqeq: 'off',
    'no-sequences': 'off',
    'no-self-assign': 'off'
  }
}

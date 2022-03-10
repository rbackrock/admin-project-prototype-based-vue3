module.exports = {
  extends: [
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': ['error', { 'builtinGlobals': false, 'hoist': 'functions', 'allow': ['state'] }],
    'no-param-reassign': ['error', { 'props': false }],
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'func-names': ['error', 'never'],
    'no-unused-expressions': ['error', { 'allowShortCircuit': true }],
    'max-len': 'off',
    'vue/script-setup-uses-vars': 'off',
    'import/no-cycle': 'off',
    'vue/multi-word-component-names': 'off',
    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off'
  }
}

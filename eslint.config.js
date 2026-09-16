const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  ...expoConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // データフェッチで useEffect 内から setState を呼ぶのは必要なパターン
      'react-hooks/set-state-in-effect': 'off',
      // useEffect 外の ref 更新パターンはレンダー関数外の useLayoutEffect 相当の用途
      'react-hooks/refs': 'off',
    },
  },
  {
    ignores: ['node_modules/', '.expo/', 'dist/', 'build/'],
  },
]);

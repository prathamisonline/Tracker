module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended', // Basic recommended ESLint rules
    'plugin:@typescript-eslint/recommended', // TypeScript-specific rules
    'prettier', // Prettier integration to handle formatting
  ],
  root: true,
  env: {
    node: true, // Enable Node.js global variables
    jest: true, // Enable Jest testing global variables
  },
  ignorePatterns: ['node_modules', 'dist', '.eslintrc.js'], // Ignore common directories
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn', // Warn on using `any` type
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignore unused vars prefixed with `_`
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable requirement for function return types
    '@typescript-eslint/ban-ts-comment': 'off', // Allow `@ts-ignore` comments
  },
};

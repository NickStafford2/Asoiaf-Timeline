// ?todo: this one might be better: https://github.com/bzvyagintsev/angular-boilerplate/blob/master/.eslintrc.js
// https://dev.to/bzvyagintsev/migrate-angular-app-to-eslint-with-prettier-airbnb-styleguide-husky-and-lint-staged-862

// current
// https://gist.github.com/eneajaho/17bbcf71c44eabf56d404b028572b97b
// https://github.com/angular-eslint/angular-eslint#notes-for-eslint-plugin-prettier-users
module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*'],
  plugins: ["import", "unused-imports"],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'airbnb-typescript/base',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@angular-eslint/component-class-suffix': [
          'error',
          {
            suffixes: ['Page', 'Component'],
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@typescript-eslint/member-ordering': 0,
        '@typescript-eslint/naming-convention': 0,
        "import/order": [
          "error",
          {
            groups: [
              'builtin', // Built-in imports (come from NodeJS native) go first
              'external', // <- External imports
              'internal', // <- Absolute imports
              ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
              'index', // <- index imports
              'unknown', // <- unknown
            ],
            'newlines-between': 'always',
            alphabetize: {
              /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
              order: 'asc',
              /* ignore case. Options: [true, false] */
              caseInsensitive: true,
            },
          },
        ]
      },
    },
    // NOTE: WE ARE NOT APPLYING PRETTIER IN THIS OVERRIDE, ONLY @ANGULAR-ESLINT/TEMPLATE
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {},
    },
    // NOTE: WE ARE NOT APPLYING @ANGULAR-ESLINT/TEMPLATE IN THIS OVERRIDE, ONLY PRETTIER
    {
      files: ['*.html'],
      excludedFiles: ['*inline-template-*.component.html'],
      extends: ['plugin:prettier/recommended'],
      rules: {
        // NOTE: WE ARE OVERRIDING THE DEFAULT CONFIG TO ALWAYS SET THE PARSER TO ANGULAR (SEE BELOW)
        'prettier/prettier': ['error', { parser: 'angular' }],
      },
    },
    // Configuration for unit and e2e spec files
    {
      files: ['*.spec.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
      parserOptions: {
        project: './tsconfig.spec.json',
      },
      extends: ['plugin:jasmine/recommended'],
      // Plugin to run Jasmine rules
      plugins: ['jasmine'],
      env: { jasmine: true },
    },
    {
      files: ['e2e/**/*.e2e-spec.ts', 'e2e/**/*.po.ts'],
      parserOptions: {
        project: './e2e/tsconfig.json',
      },
      extends: ['plugin:protractor/recommended'],
      plugins: ['protractor'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
  ],
};

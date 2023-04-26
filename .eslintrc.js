// https://gist.github.com/eneajaho/17bbcf71c44eabf56d404b028572b97b
// https://github.com/angular-eslint/angular-eslint#notes-for-eslint-plugin-prettier-users
module.exports = {
  "root": true,
    "ignorePatterns": ["projects/**/*"],
      "overrides": [
        {
          "files": ["*.ts"],
          "parserOptions": {
            "project": ["tsconfig.json"],
            tsconfigRootDir: __dirname,
            "createDefaultProgram": true
          },
          "extends": [
            "plugin:@angular-eslint/recommended",
            "plugin:@angular-eslint/template/process-inline-templates",
            "plugin:prettier/recommended"
          ],
          "rules": {
            "@angular-eslint/component-class-suffix": [
              "error",
              {
                "suffixes": ["Page", "Component"]
              }
            ],
            "@angular-eslint/component-selector": [
              "error",
              {
                "type": "element",
                "prefix": "app",
                "style": "kebab-case"
              }
            ],
            "@angular-eslint/directive-selector": [
              "error",
              {
                "type": "attribute",
                "prefix": "app",
                "style": "camelCase"
              }
            ],
            "@typescript-eslint/member-ordering": 0,
            "@typescript-eslint/naming-convention": 0
          }
        },
        // NOTE: WE ARE NOT APPLYING PRETTIER IN THIS OVERRIDE, ONLY @ANGULAR-ESLINT/TEMPLATE
        {
          "files": ["*.html"],
          "extends": ["plugin:@angular-eslint/template/recommended"],
          "rules": {}
        },
        // NOTE: WE ARE NOT APPLYING @ANGULAR-ESLINT/TEMPLATE IN THIS OVERRIDE, ONLY PRETTIER
        {
          "files": ["*.html"],
          "excludedFiles": ["*inline-template-*.component.html"],
          "extends": ["plugin:prettier/recommended"],
          "rules": {
            // NOTE: WE ARE OVERRIDING THE DEFAULT CONFIG TO ALWAYS SET THE PARSER TO ANGULAR (SEE BELOW)
            "prettier/prettier": ["error", { "parser": "angular" }]
          }
        }
      ]
}

/*
const try2 = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard-with-typescript'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      'tsconfig.json'
    ],
    tsconfigRootDir: __dirname,
    createDefaultProgram: true
  },
  rules: {
  }
}
*/
/*
const try1 = {
  "root": true,
  "ignorePatterns": [*/
  //  "projects/**/* " 
/*  ],
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "parserOptions": {
        "project": [
          "tsconfig.json"
        ],
        "tsconfigRootDir": __dirname,
        "createDefaultProgram": true
      },
      "extends": [
        "eslint:recommended",
        //"plugin:@typescript-eslint/reccomended"
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
      "rules": {
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],
        //"@typescript-eslint/array-type": "warn",
        //"member-access": [true, "no-public"],
      }
    },
    {
      "files": [
        "*.html"
      ],
      "extends": [
        "plugin:@angular-eslint/template/recommended"
      ],
      "rules": {}
    }
  ]
}
*/

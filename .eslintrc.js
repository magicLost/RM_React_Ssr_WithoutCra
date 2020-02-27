/* {
    "extends": ["airbnb", "prettier", "plugin:node/recommended"],
    "plugins": ["prettier"],
    "rules": {
      "prettier/prettier": "error",
      "spaced-comment": "off",
      "no-console": "off",
      "consistent-return": "off",
      "func-names": "off",
      "object-shorthand": "off",
      "no-process-exit": "off",
      "no-param-reassign": "off",
      "no-return-await": "off",
      "no-underscore-dangle": "off",
      "class-methods-use-this": "off",
      "prefer-destructuring": ["error", { "object": true, "array": false }],
      "no-unused-vars": ["error", { "argsIgnorePattern": "req|res|next|val" }]
    }
  } */

  /* extinds: [

    "plugin:node/recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ] */

module.exports = {
  //root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "prettier",
    '@typescript-eslint'
  ],
  extends: [
    "airbnb-typescript", 
    'prettier/@typescript-eslint',
  ],
  rules: {
    "prettier/prettier": "error",
    "spaced-comment": "off",
    "no-console": "on",
    "consistent-return": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "no-process-exit": "off",
    "no-param-reassign": "off",
    "no-return-await": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "prefer-destructuring": ["error", { "object": true, "array": false }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "req|res|next|val" }]
  }
}

            
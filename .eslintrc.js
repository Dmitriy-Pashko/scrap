module.exports = {
    "extends": "airbnb",
    "rules": {
      "allowElseIf": true,
      "no-use-before-define": ["error", { "functions": true, "classes": true, "variables": false }],
      "no-console": ["error", { allow: ["warn", "error", "log"] }],
      "no-else-return": ["error", {allowElseIf: true}],
      "prefer-destructuring": 0,
      "no-underscore-dangle": ["error", { "allow": ["_id"] }],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "prefer-arrow-callback": 0,
      "func-names": ["error", "never"],
    },
    "env": {
      "browser": true,
      "mocha": true,
      "node": true
    }
};
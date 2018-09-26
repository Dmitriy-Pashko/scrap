module.exports = {
    "extends": "airbnb",
    "rules": {
      "allowElseIf": true,
      "no-use-before-define": ["error", { "functions": true, "classes": true, "variables": false }],
      "no-console": ["error", { allow: ["warn", "error", "log"] }],
      "no-else-return": ["error", {allowElseIf: true}]
    },
    "env": {
      "browser": true,
      "node": true
    }
};
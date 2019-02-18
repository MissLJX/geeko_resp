module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "commonjs": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "no-unused-vars": [1, { "vars": "all", "args": "none" }],
        "no-console": 0,
        "no-duplicate-case": 0
    }
};
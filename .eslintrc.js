module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        // 使用 tab 空隔
        "indent": [0, "tab"],
        // 尽量使用单引号
        "quotes": [1, "single"],
        // 语句不使用分号结尾
        "semi": [2, "never"],
        // 允许调用 console
        "no-console": 0,
    }
};
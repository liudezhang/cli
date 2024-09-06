/** @type {import("prettier").Config} */
const config = {
  useTabs: false, // 使用tab缩进
  tabWidth: 2, // tab缩进大小
  semi: false, // 末尾分号
  singleQuote: false, // 使用单引号
  trailingComma: "all", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  printWidth: 80, // 换行字符串阈值
  arrowParens: "always", // 箭头函数只有一个参数时，也需要括号
  jsxBracketSameLine: false, // jsx的标签的反尖括号放在最后一行
  jsxSingleQuote: false, // jsx中使用单引号
  endOfLine: "lf", // 换行符
  quoteProps: "as-needed", // 对象的key只有需要加引号时才加引号
  bracketSpacing: true, //  在对象字面量声明所使用的的花括号后（{）和前（}）输出空格
}

module.exports = config

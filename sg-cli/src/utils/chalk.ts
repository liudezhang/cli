import chalk from "chalk"

const customChalk = {
  success(text: string) {
    return chalk.green(text)
  },

  error(text: string) {
    return chalk.red(text)
  },

  warning(text: string) {
    return chalk.yellow(text)
  },

  info(text: string) {
    return chalk.hex("#c5c5c5")(text)
  },

  underline(text: string) {
    return chalk.underline(text)
  },
  bold(text: string) {
    return chalk.bold(text)
  },

  dim(text: string) {
    return chalk.dim(text)
  },
  // 个性化颜色
  hex(color: string) {
    return chalk.hex(color)
  },
  // 背景颜色
  bgHex(color: string) {
    return chalk.bgHex(color)
  },
}

// 个性化chalk
export default {
  ...chalk,
  ...customChalk,
}

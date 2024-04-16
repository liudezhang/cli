import chalk from "chalk"

// keyof Chalk 的类型 并排除 某些类型

type ChalkFnType = keyof Omit<Chalk, "hex" | "bgHex">

class Chalk {
  constructor() {}

  success(text: string) {
    return chalk.green(text)
  }

  error(text: string) {
    return chalk.red(text)
  }

  warning(text: string) {
    return chalk.yellow(text)
  }

  info(text: string) {
    return chalk.hex("#c5c5c5")(text)
  }

  underline(text: string) {
    return chalk.underline(text)
  }

  bold(text: string) {
    return chalk.bold(text)
  }

  dim(text: string) {
    return chalk.dim(text)
  }

  log(text: string, type: ChalkFnType = "info") {
    console.log(this[type](text))
  }

  logWithTime(text: string, type: ChalkFnType = "info") {
    const time = new Date().toLocaleTimeString()
    console.log(this[type](`[${time}] ${text}`))
  }

  // 个性化颜色
  hex(color: string) {
    return chalk.hex(color)
  }

  // 背景颜色
  bgHex(color: string) {
    return chalk.bgHex(color)
  }
}

export default new Chalk()

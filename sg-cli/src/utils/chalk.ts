import chalk from "chalk";

class Chalk {
  constructor() {}

  success(text: string) {
    return chalk.green(text);
  }

  error(text: string) {
    return chalk.red(text);
  }

  warning(text: string) {
    return chalk.yellow(text);
  }

  info(text: string) {
    return chalk.blue(text);
  }

  underline(text: string) {
    return chalk.underline(text);
  }

  bold(text: string) {
    return chalk.bold(text);
  }
}

export default new Chalk();

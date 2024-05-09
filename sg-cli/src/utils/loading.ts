import ora from "ora"
import type { Ora, Options } from "ora"

class Loading {
  private spinner: Ora

  constructor() {
    this.spinner = ora()
  }

  /**
   * 启动加载动画
   * @param textOrOptions - 加载文本
   * @param customOptions - 自定义加载选项
   * @returns Promise<void>
   */
  start(textOrOptions: string | Options, customOptions?: Options) {
    this.spinner = ora({ text: textOrOptions, ...customOptions } as Options)
    this.spinner.start()
  }

  /**
   * 更新加载文本
   * @param text - 新的加载文本
   */
  update(text: string) {
    this.spinner.text = text
  }

  /**
   * 停止加载动画
   */
  stop() {
    this.spinner.stop()
  }

  /**
   * 显示加载成功消息
   * @param text - 成功文本
   */
  succeed(text?: string) {
    this.spinner.succeed(text)
  }

  /**
   * 显示加载失败消息
   * @param text - 失败文本
   */
  fail(text?: string) {
    this.spinner.fail(text)
  }

  /**
   * 显示警告消息
   * @param text - 警告文本
   */
  warn(text?: string) {
    this.spinner.warn(text)
  }

  /**
   * 显示信息消息
   * @param text - 信息文本
   */
  info(text?: string) {
    this.spinner.info(text)
  }
}

export default new Loading()

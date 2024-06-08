import * as commitizen from "commitizen/dist/cli/git-cz.js"
import { join } from "node:path"

export default async function () {
  // 删除最后一个  cz 或者 commit, 因为会被 git读取 导致报错
  process.argv.splice(2, 1)
  // 调用 bootstrap 方法
  commitizen.bootstrap({
    cliPath: join(__dirname, "../../../node_modules/commitizen"),
    config: {
      path: "cz-git",
    },
    // 还有什么参数？
    verbose: true, // 是否开启详细日志
  })
}

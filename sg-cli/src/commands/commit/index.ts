import path from "node:path"
import fs from "@/utils/fs"

function loaderConfig(path: string) {
  try {
    // return fs.readFileSync(path, { encoding: "utf-8" })
    return require(path)
  } catch (error) {
    return {}
  }
}

const defaultConfig = path.resolve(
  __dirname,
  "../../profile/files/cz-git/commitlint.config.js",
)

export default async function () {
  const configObj = loaderConfig(defaultConfig)
  console.log(configObj)

  // 根据 configObj 中的配置进行 commitlint 配置

  console.log("自定义commitlint模块的")

  process.exit()
}

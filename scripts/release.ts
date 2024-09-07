import { execSync } from "child_process"
import packageJson from "../package.json"
import fs from "../src/utils/fs"

try {
  const readme = fs.readFileSync("RealREADME.md", "utf-8")
  // 正则匹配 """{{packageName}}"""
  const newReadme = readme.replace(/"""{{packageName}}"""/g, packageJson.name)
  fs.writeFileSync("README.md", newReadme)

  // patch   # 小版本更新
  // minor   # 中版本更新
  // major   # 大版本更新
  execSync("npm run build && npm version patch && npm publish", {
    stdio: "inherit",
  })

  // 发布成功后删除 README.md
  fs.removeSync("README.md")

  console.log("发布成功")
} catch (error) {
  console.error(error)
  process.exit(1)
}

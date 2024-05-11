import { execSync } from "child_process"
import packageJson from "../package.json"
import fs from "fs-extra"

const readme = fs.readFileSync("RealREADME.md", "utf-8")
// 正则匹配 """{{packageName}}"""
const newReadme = readme.replace(/"""{{packageName}}"""/g, packageJson.name)
fs.writeFileSync("README.md", newReadme)

// 将 RealREADME.md 复制到 bin 目录下



execSync("npm run build && npm version patch && npm publish", { stdio: "inherit" });

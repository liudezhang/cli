import fs from "@/utils/fs"
import { exec, execSync } from "child_process"
import { resolve, join } from "node:path"

// const configPath = join(__dirname, "../../profile/files/cz-git/.czrc")
const configPath = join(__dirname, "../../profile/files/cz-git/cz.config.js")

export default async function () {
  const czgPacakge = resolve(
    __dirname,
    "../../../node_modules/czg/node_modules/.bin/czg",
  )

  console.log(process.cwd())
  if (fs.existsSync(process.cwd() + ".czrc")) {
    console.log("存在czrc文件")
  }

  execSync(`${czgPacakge} emoji`, { stdio: "inherit" })
  // execSync(`${czgPacakge} emoji --config="${configPath}"`, { stdio: "inherit" })
}

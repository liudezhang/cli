import fs from "@/utils/fs"
import { exec, execSync } from "child_process"
import { resolve, join } from "node:path"
const { bootsrap } = require("czg")

const configPath = join(__dirname, "../../profile/files/cz-git/.czrc")
// const configPath = join(__dirname, "../../profile/files/cz-git/cz.config.js")

export default async function () {
  if (fs.existsSync(process.cwd() + ".czrc")) {
    console.log("存在czrc文件")
  }

  bootsrap({
    config: configPath,
    emoji: true,
  })

  // execSync(`${czgPacakge} emoji`, { stdio: "inherit" })
  // execSync(`${czgPacakge} emoji --config="${configPath}"`, { stdio: "inherit" })
}

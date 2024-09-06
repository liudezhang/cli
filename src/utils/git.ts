import { execSync } from "child_process"
import loading from "./loading"

export const checkGitVersion = async () => {
  const version = execSync("git --version").toString().trim()

  // 检查是否安装git
  if (!version) {
    loading.fail("请先安装git")
    process.exit(1)
  }

  // 检查git版本是否符合
  const versionArr = version.split(" ")
  const versionNum = versionArr[versionArr.length - 1].split(".")
  if (
    parseInt(versionNum[0]) > 2 ||
    (parseInt(versionNum[0]) === 2 && parseInt(versionNum[1]) < 25)
  ) {
    loading.fail("git 版本过低，请升级到2.25以上")
    process.exit(1)
  }
}

export const initGit = async (dir: string) => {
  loading.start("初始化git仓库")
  process.chdir(process.cwd() + "/" + dir)
  execSync("git init")
  loading.succeed("初始化git仓库成功")
}

export const getGitUser = async () => {
  const name = execSync("git config user.name").toString().trim()
  const email = execSync("git config user.email").toString().trim()

  if (!name || !email) {
    return {
      name: "",
      email: "",
    }
  }
  return { name, email }
}

import { execSync } from "child_process"
import loading from "./loading"

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

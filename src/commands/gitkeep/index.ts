import fs from "@/utils/fs"
import path from "path"

function createGitkeepInEmptyDirs(dirPath: string, ignorePatterns: string[]) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true })
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file.name)

    // 如果是目录且不在忽略列表中
    if (file.isDirectory() && !ignorePatterns.includes(file.name)) {
      // 递归检查子目录
      createGitkeepInEmptyDirs(fullPath, ignorePatterns)

      // 检查当前目录是否为空
      const subFiles = fs.readdirSync(fullPath, { withFileTypes: true })
      if (subFiles.length === 0) {
        // 创建 .gitkeep 文件
        fs.writeFileSync(path.join(fullPath, ".gitkeep"), "*")
        console.log(`${fullPath} 为空文件夹, 创建 .gitkeep`)
      }
    }
  })
}

function removeGitkeepNotEmptyDirs(dirPath: string, ignorePatterns: string[]) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true })
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file.name)

    // 如果是目录且不在忽略列表中
    if (file.isDirectory() && !ignorePatterns.includes(file.name)) {
      // 递归检查子目录
      removeGitkeepNotEmptyDirs(fullPath, ignorePatterns)

      // 检查当前目录排除 .gitkeep 是否为空
      const subFiles = fs
        .readdirSync(fullPath)
        .filter((file) => file !== ".gitkeep")

      // 如果当前目录不为空
      if (subFiles.length !== 0) {
        if (fs.existsSync(path.join(fullPath, ".gitkeep"))) {
          fs.removeSync(path.join(fullPath, ".gitkeep"))
          console.log(`${fullPath} 不是空文件夹, 删除 .gitkeep 文件`)
        }
      }
    }
  })
}

function removeGitkeepDirs(dirPath: string, ignorePatterns: string[]) {
  // 删除当前目录下的所有子目录的 .gitkeep 文件
  const files = fs.readdirSync(dirPath, { withFileTypes: true })
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file.name)

    // 如果是目录且不在忽略列表中
    if (file.isDirectory() && !ignorePatterns.includes(file.name)) {
      // 递归检查子目录
      removeGitkeepDirs(fullPath, ignorePatterns)

      if (fs.existsSync(path.join(fullPath, ".gitkeep"))) {
        fs.removeSync(path.join(fullPath, ".gitkeep"))
        console.log(`${fullPath}, 删除 .gitkeep 文件`)
      }
    }
  })
}

// 解析 .gitignore 文件 生成忽略列表
function parseGitignore(gitignorePath: string) {
  const content = fs.readFileSync(gitignorePath, "utf-8")
  // 这里简单地将每一行视为一个要忽略的目录名，不考虑通配符等
  return content
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.trim().startsWith("#"))
}

// -a 给当前目录下的所有空文件夹 递归生成 .gitkeep
// 排除 .gitignore 文件中的文件夹规则
export default function (cmd: { a?: boolean; d?: boolean; r?: boolean }) {
  // 获取当前目录
  const cwd = process.cwd()

  const gitignorePath = path.join(cwd, ".gitignore")

  if (Object.keys(cmd).length && !fs.existsSync(gitignorePath)) {
    console.log(".gitignore 文件不存在")
    return
  }

  const ignorePatterns = parseGitignore(gitignorePath)

  if (cmd.a) {
    createGitkeepInEmptyDirs(cwd, ignorePatterns)
  }

  if (cmd.d) {
    removeGitkeepNotEmptyDirs(cwd, ignorePatterns)
  }

  if (cmd.r) {
    removeGitkeepDirs(cwd, ignorePatterns)
  }

  if (!Object.keys(cmd).length) {
    fs.writeFileSync(path.join(cwd, ".gitkeep"), "*")
  }
}

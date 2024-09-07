import fs from "@/utils/fs"
import path from "path"
import { compile } from "gitignore-parser"

type tCompile = {
  accepts(input: string): boolean
  denies(input: string): boolean
  maybe(input: string): boolean
}

/**
 * 递归处理目录，根据回调函数执行具体操作
 * @param dirPath 目录路径
 * @param gitignore 忽略的目录名称列表
 * @param callback 回调函数，处理每个目录的操作
 */
function processDirectories(
  dirPath: string,
  gitignore: tCompile,
  callback: (fullPath: string, isEmpty: boolean) => void,
) {
  let files = fs.readdirSync(dirPath, { withFileTypes: true })

  files = files.filter((file) => gitignore.accepts(file.name))

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file.name)

    if (file.isDirectory()) {
      processDirectories(fullPath, gitignore, callback)

      const subFiles = fs.readdirSync(fullPath, { withFileTypes: true })
      const isEmpty = subFiles.length === 0
      callback(fullPath, isEmpty)
    }
  })
}

/**
 * 在所有空目录中创建 .gitkeep 文件
 * @param dirPath 目录路径
 * @param gitignore 忽略的目录名称列表
 */
function createGitkeepInEmptyDirs(dirPath: string, gitignore: tCompile) {
  processDirectories(dirPath, gitignore, (fullPath, isEmpty) => {
    if (isEmpty) {
      fs.writeFileSync(path.join(fullPath, ".gitkeep"), "*")
      console.log(`${fullPath} 是空目录, 已创建 .gitkeep 文件`)
    }
  })
}

/**
 * 删除所有非空目录中的 .gitkeep 文件
 * @param dirPath 目录路径
 * @param gitignore 忽略的目录名称列表
 */
function removeGitkeepFromNonEmptyDirs(dirPath: string, gitignore: tCompile) {
  processDirectories(dirPath, gitignore, (fullPath, isEmpty) => {
    if (!isEmpty) {
      // 读取 fullPath 目录下的文件
      let files = fs.readdirSync(fullPath)
      files = files.filter((file) => file !== ".gitkeep")
      if (files.length !== 0) {
        const gitkeepPath = path.join(fullPath, ".gitkeep")

        if (fs.existsSync(gitkeepPath)) {
          fs.removeSync(gitkeepPath)
          console.log(`${fullPath} 不是空目录，已删除 .gitkeep 文件`)
        }
      }
    }
  })
}

/**
 * 删除所有目录中的 .gitkeep 文件
 * @param dirPath 目录路径
 * @param gitignore 忽略的目录名称列表
 */
function removeAllGitkeepFiles(dirPath: string, gitignore: tCompile) {
  processDirectories(dirPath, gitignore, (fullPath) => {
    const gitkeepPath = path.join(fullPath, ".gitkeep")
    if (fs.existsSync(gitkeepPath)) {
      fs.removeSync(gitkeepPath)
      console.log(`已删除 ${fullPath} 中的 .gitkeep 文件`)
    }
  })
}

/**
 * 根据命令行参数执行相应操作
 * @param cmd 命令行参数
 */
export default function (cmd: any) {
  const cwd = process.cwd()
  const gitignorePath = path.join(cwd, ".gitignore")

  const gitignore = compile(fs.readFileSync(gitignorePath, "utf-8"))

  if (cmd.a) {
    createGitkeepInEmptyDirs(cwd, gitignore)
  } else if (cmd.d) {
    removeGitkeepFromNonEmptyDirs(cwd, gitignore)
  } else if (cmd.r) {
    removeAllGitkeepFiles(cwd, gitignore)
  } else if (!Object.keys(cmd).length) {
    fs.writeFileSync(path.join(cwd, ".gitkeep"), "*")
    console.log("已在当前目录中创建 .gitkeep 文件")
  }
}

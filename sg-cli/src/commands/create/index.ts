import { ExecException, exec, execSync } from "child_process"
import inquirer from "inquirer"

import { IProjectConfig, projectDir, projectGit } from "@/config/projectMap"
import loading from "@/utils/loading"
import chalk from "@/utils/chalk"
import fs from "@/utils/fs"

export default async function (projectName: string, cmd: any) {
  try {
    // 1. 检查项目名是否合法
    // 项目名只能包含字母、数字、下划线、中划线 必须以字母开头
    const reg = /^[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9]$/
    if (!reg.test(projectName)) {
      chalk.log("项目名不合法", "error")
      return
    }

    // 2. 检查项目是否已存在
    const isExists = fs.existsSync(projectName)

    if (cmd.force) {
      loading.start("删除 " + projectName + " 项目中")
      await fs.remove(projectName)
      loading.succeed("删除 " + projectName + " 项目成功")
    }

    if (isExists) {
      const { isCover } = await inquirer.prompt([
        {
          name: "isCover",
          type: "confirm",
          message: "项目已存在 是否覆盖",
        },
      ])

      if (isCover) {
        loading.start("删除 " + projectName + " 项目中")
        await fs.remove(projectName)
        loading.succeed("删除 " + projectName + " 项目成功")
      } else {
        return
      }
    }

    /* --------------------------------- 项目创建流程 --------------------------------- */
    // 1. 创建项目目录

    // 2. 下载模板
    // 使用 git clone 命令下载模板

    // 移动模板文件到项目目录
    const projectPath = `${process.cwd()}\\${projectName}`

    // 判断模板文件是否存在
    if (fs.existsSync(projectDir)) {
      // 删除模板文件
      await fs.remove(projectDir)
    }

    loading.start("模板下载中", {
      stream: process.stdout,
    })
    const result = await new Promise<ExecException | null>((resolve) =>
      exec(`git clone ${projectGit}`, (error) => resolve(error)),
    )

    if (result) {
      loading.fail("模板下载失败")
      console.log(result, "模板下载失败")
      return
    }

    // 获取项目模板文件夹
    const templatePath = `${process.cwd()}\\${projectDir}`
    loading.succeed("模板下载成功")
    loading.stop()
    const projectJson = fs.readJsonSync(templatePath + "/project.json")

    //  选择模板 和 包管理工具 询问
    const { template, packageManager, description } = await inquirer.prompt([
      {
        name: "template",
        type: "list",
        message: "请选择模板",
        choices: projectJson.map((item: IProjectConfig) => {
          return {
            name: item.name,
            key: item.key,
            value: item.value,
            description: item.description,
          }
        }),
      },
      {
        name: "packageManager",
        type: "list",
        message: "请选择包管理工具",
        choices: [
          {
            name: "npm",
            value: "npm",
          },
          {
            name: "yarn",
            value: "yarn",
          },
          {
            name: "pnpm",
            value: "pnpm",
          },
        ],
      },
      {
        name: "description",
        type: "input",
        message: "请输入项目描述",
        default: "",
      },
    ])

    // 3. 安装依赖
    // 移动模板文件到项目目录
    fs.moveSync(`${templatePath}\\${template}`, projectPath, {
      overwrite: true,
    })
    removeProjectDir(projectDir)

    //  修改 package.json 文件 并 格式化
    const packageJsonPath = `${projectPath}\\package.json`
    const packageJson = fs.readJsonSync(packageJsonPath)
    const packageScript = Object.keys(packageJson.scripts)
    packageJson.name = projectName
    packageJson.version = "1.0.0"
    packageJson.description = description
    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 }) // 格式化写入

    // 安装依赖
    chalk.log("开始安装依赖")
    execSync(`cd ${projectName} && git init && ${packageManager} install`, {
      stdio: "inherit", // 打印子进程的输出
    })
    chalk.log("依赖安装成功", "success")

    // 4. 安装完成

    // 5. 打印提示信息
    chalk.log("项目创建成功", "success")
    // chalk.log("请执行以下命令启动项目", "info")
    // console.log(
    //   chalk.hex("#0ff")(
    //     [
    //       `cd ${projectName}`,
    //       ...packageScript.map((item) => `${packageManager} run ${item}`),
    //     ].join("\n"),
    //   ),
    // )
  } catch (error) {
    console.log(error)
    chalk.log("项目创建失败", "error")
    loading.stop()
    // 删除模板文件
    removeProjectDir(projectDir)
    process.exit()
  }
}

const removeProjectDir = (projectName: string) => {
  fs.remove(process.cwd() + "\\" + projectName).catch((error) => {
    chalk.log("删除模板文件失败 请手动删除【" + projectName + "】目录", "error")
  })
}

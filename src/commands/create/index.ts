import { exec, execSync } from "child_process"
import inquirer from "inquirer"
import { IProjectConfig, projectDir, projectGit } from "@/config/projectMap"
import loading from "@/utils/loading"
import chalk from "@/utils/chalk"
import fs from "@/utils/fs"
import { checkGitVersion, getGitUser, initGit } from "@/utils/git"
import { getProjectJson } from "@/utils/project"

export default async function (projectName: string, cmd: any) {
  try {
    // 检查项目名是否合法
    // 项目名只能包含字母、数字、下划线、中划线 必须以字母开头
    const reg = /^[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9]$/
    if (!reg.test(projectName)) {
      console.log(chalk.error("项目名不合法"))
      return
    }

    //  检查项目是否已存在
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

    // 检查git版本
    await checkGitVersion()

    /* --------------------------------- 项目创建流程 --------------------------------- */
    console.log(chalk.info("项目创建中..."))
    const projectPath = `${process.cwd()}\\${projectName}`

    const projectJson = await getProjectJson()

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

    // 创建项目目录
    fs.mkdirSync(projectName)

    // git 稀疏克隆 仅下载指定文件夹 检出template下的所有文件和文件夹 其他文件夹不下载
    const commandList = [
      `git clone --filter=blob:none --no-checkout ${projectGit} ${projectName}`, // 克隆项目 不检出
      `cd ${projectName}`, // 进入项目目录
      `git init`, // 初始化稀疏检出
      // 因为 git sparse-checkout init 会有默认配置 所以要覆盖
      `git config core.sparsecheckout true`, // 关闭稀疏检出
      `echo !/* > .git/info/sparse-checkout`, // 生成 .git/info/sparse-checkout 文件 排除所有文件
      `echo ${template}/ >> .git/info/sparse-checkout`, // 写入模板文件夹
      `git checkout`, // 检出模板文件夹
    ]

    // 执行命令
    const command = commandList.join(" && ")
    execSync(command)

    // 拷贝模板文件到项目目录
    const srcPath = `${projectPath}\\${template}`
    const destPath = projectPath
    fs.copySync(srcPath, destPath, {
      overwrite: true,
    })

    // 需要删除的文件夹或文件
    const removeFiles = [".git"]
    removeFiles.push(template) // 删除模板文件夹
    await Promise.all(
      removeFiles.map((item) => fs.remove(`${projectPath}\\${item}`)),
    )

    // 获取 git 用户信息
    loading.start("获取git用户信息")
    const { name, email } = await getGitUser()
    loading.succeed("获取git用户信息成功")

    //  修改 package.json 文件 并 格式化
    const packageJsonPath = `${projectPath}\\package.json`
    const packageJson = fs.readJsonSync(packageJsonPath)
    const packageScript = Object.keys(packageJson.scripts)

    Object.assign(packageJson, {
      name: projectName,
      version: "0.0.0",
      description: description,
      author: name && email ? `${name} <${email}>` : name || email || "",
      private: true,
    })

    // 格式化写入
    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 })

    // 安装依赖
    console.log(chalk.info("安装依赖中..."))
    execSync(`cd ${projectName} && ${packageManager} install`, {
      stdio: "inherit", // 打印子进程的输出
    })
    console.log(chalk.success("依赖安装成功"))

    // 初始化git仓库
    await initGit(projectName)

    console.log(chalk.success("项目创建成功"))
    console.log(chalk.hex("#0ff")(`执行以下命令启动项目`))
    console.log(
      chalk.hex("#0ff")(
        [
          `cd ${projectName}`,
          ...packageScript.map((item) => `${packageManager} run ${item}`),
        ].join("\n"),
      ),
    )
  } catch (error) {
    console.log(error)
    console.log(chalk.error("项目创建失败"))
    loading.stop()
    process.exit()
  }
}

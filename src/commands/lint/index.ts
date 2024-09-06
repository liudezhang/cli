import { execSync } from "child_process"
import inquirer from "inquirer"
import loading from "@/utils/loading"
import fs from "@/utils/fs"
import { sleep } from "@/utils/utils"
import chalk from "@/utils/chalk"
import {
  eslintignore,
  prettierConfigJs,
  prettierignore,
  editorconfig,
} from "@/profile"

const list = [
  "editorconfig",
  "eslint",
  "prettier",
  // "stylelint",
  // "husky",
  // "lint-staged",
  // "commitlint",
  // "standard-version",
  // "changelog",
] as const

type packageManager = "npm" | "pnpm"
// config 是 list 的联合类型
type config = (typeof list)[number]

type IScriptsInfo = {
  [key in config]?: string
}

type IScripts = {
  [key in packageManager]: IScriptsInfo
}

const scripts: IScripts = {
  npm: {
    eslint: "init @eslint/config@latest",
    prettier: "install --save-dev --save-exact prettier",
  },
  pnpm: {
    eslint: "init @eslint/config@latest",
    prettier: "add --save-dev --save-exact prettier",
  },
}

export default async function () {
  const { config, packageManager } = await inquirer.prompt<{
    config: config[]
    packageManager: packageManager
  }>([
    {
      name: "config",
      type: "checkbox",
      message: "请选择需要添加的配置",
      loop: false, // 选择完毕后不再循环
      pageSize: 15, // 一页显示 15 个选项
      choices: list.map((item) => {
        return {
          name: item,
          value: item,
        }
      }),
      validate: (val: config[]) => {
        if (val.length === 0) {
          return "至少选择一个配置"
        }
        return true
      }
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
          name: "pnpm",
          value: "pnpm",
        },
      ],
    },
  ])

  try {
    for (let i = 0; i < config.length; i++) {
      const item = config[i]
      await sleep(100)
      loading.start(`正在初始化 ${item} 配置\n`)

      if (item === "editorconfig") {
        fs.writeFileSync(".editorconfig", editorconfig, "utf-8")
        loading.succeed(chalk.success(`初始化 ${item} 配置成功`))
        continue
      }

      const script = `${packageManager} ${scripts[packageManager][item] as string}`
      execSync(script, {
        stdio: "inherit",
      })

      // eslint 独有处理
      if (item === "eslint") {
        fs.writeFileSync(".eslintignore", eslintignore, "utf-8")
      }

      // prettier 独有处理
      if (item === "prettier") {
        fs.writeFileSync("prettier.config.js", prettierConfigJs, "utf-8")
        fs.writeFileSync(".prettierignore", prettierignore, "utf-8")
      }
      loading.succeed(chalk.success(`初始化 ${item} 配置成功`))
    }
    console.log(chalk.success("配置成功"))
  } catch (error) {
    console.log(error)
    loading.fail(chalk.error("配置失败"))
    return
  }
}

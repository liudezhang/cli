#! /usr/bin/env node
import { bgBlueBright } from "chalk"
import { Command } from "commander"
import { textSync } from "figlet"
import inquirer from "inquirer"
import ora from "ora"
import packageJson from "../package.json"

// const choseQuestion = async () => {
//   const { list } = await inquirer.prompt([
//     {
//       type: "list",
//       name: "list",
//       message: "请选择一个你喜欢的颜色",
//       choices: ["red", "green", "blue"],
//     },
//   ])

//   console.log(
//     bgBlueBright(textSync("Hello World", { horizontalLayout: "full" }))
//   )
// }

// choseQuestion().then((res) => {
//   console.log("选择完毕", res)
// })

// const program = new Command()

// program
//   .name(packageJson.name)
//   .description(packageJson.description)
//   .version(packageJson.version)
//   .helpOption("-h, --help", "sg-cli 帮助文档")

// // create 命令
// program
//   .command("create <name>")
//   .description("创建一个新项目")
//   .action((name) => {
//     console.log("create", name)
//   })

// program.parse(process.argv) // 解析命令行参数

const loading = async <T extends string>(msg: T): Promise<T> => {
  const spinner = ora(msg)
  spinner.start()
  try {
    const res = await new Promise<T>((resolve) => {
      setTimeout(() => {
        resolve(msg)
      }, 2000)
    })
    spinner.succeed("加载成功")
    return Promise.resolve(res)
  } catch (error) {
    spinner.fail("加载失败")
    return Promise.reject(error)
  }
}

loading("加载中").then((res) => {
  console.log("res", res)
})

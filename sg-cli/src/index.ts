#! /usr/bin/env node
import { Command } from "commander"
import commands from "./commands/index"
import packageJson from "../package.json"
import isAdministrator from "@/utils/isAdministrator"

const program = new Command()

program
  .name(packageJson.name)
  .version(packageJson.version)
  .description(packageJson.description)
  .helpOption("-h, --help", "显示帮助信息")

  .usage("<command> [options]")

Object.keys(commands).forEach((command: string) => {
  const value = commands[command] // 获取命令的值
  const cmd = program.command(command) // 创建命令
  // 设置命令前置钩子 (判断是否是管理员权限)
  cmd.hook(
    "preAction",
    async (thisCommand: Command, actionCommand: Command) => {
      if (!(await isAdministrator())) {
        process.exit(1) // 如果不是管理员则退出进程
      }
    },
  )
  cmd.description(value.description) // 设置命令描述
  // 设置命令选项
  value.options.forEach((option) => {
    cmd.option(option.cmd, option.description)
  })
  // 设置命令执行动作
  cmd.action(value.actions)
})

program.parse(process.argv)

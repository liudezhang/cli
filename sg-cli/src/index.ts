#! /usr/bin/env node

import fs from "fs";

import { Command } from "commander";
import commands from "./commands/index.js";
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

const program = new Command();

program
  .name(packageJson.name)
  .version(packageJson.version)
  .description(packageJson.description)
  .helpOption("-h, --help", "显示帮助信息")
  .usage("<command> [options]");

Object.keys(commands).forEach((command: string) => {
  const value = commands[command]; // 获取命令的值
  const cmd = program.command(command); // 创建命令
  cmd.description(value.description); // 设置命令描述
  // 设置命令选项
  value.options.forEach((option) => {
    cmd.option(option.cmd, option.description);
  });
  // 设置命令执行动作
  cmd.action(value.actions);
});

program.parse();

#! /usr/bin/env node

import fs from "fs";
import { Command } from "commander";
import inquirer from "inquirer";
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
import type { QuestionCollection, Answers } from "inquirer";

import loading from "./utils/loading.js";
import chalk from "./utils/chalk.js";

const choseList: QuestionCollection<Answers> = [
  {
    type: "input",
    name: "name",
    message: "请输入项目名称",
    default: "sg-project-demo",
  },
  {
    type: "list",
    name: "type",
    message: "请选择项目类型",
    choices: ["react", "vue", "node", "electron", "flutter", "uni-app", "taro"],
    default: "vue",
  },
  {
    type: "checkbox",
    name: "features",
    message: "请选择你需要的功能",
    choices: [
      {
        name: "typescript",
        checked: true,
      },
      {
        name: "eslint",
        checked: true,
      },
      {
        name: "prettier",
        checked: true,
      },
      {
        name: "stylelint",
        checked: true,
      },
      {
        name: "commitlint",
        checked: true,
      },
      {
        name: "husky",
        checked: true,
      },
      {
        name: "lint-staged",
        checked: true,
      },
      {
        name: "git-cz",
        checked: true,
      },
      {
        name: "storybook",
        checked: true,
      },
    ],
  },
  {
    type: "confirm",
    name: "confirm",
    message: "是否确认以上配置",
    default: true,
  },
  {
    type: "editor",
    name: "editor",
    message: "请编辑你的配置文件",
    default: "",
  },
  {
    type: "expand",
    name: "expand",
    message: "请选择一个你喜欢的颜色",
    choices: [
      {
        key: "r",
        name: "red",
        value: "red",
      },
      {
        key: "g",
        name: "green",
        value: "green",
      },
      {
        key: "b",
        name: "blue",
        value: "blue",
      },
    ],
  },
  {
    type: "number",
    name: "number",
    message: "请输入一个数字",
    default: 0,
  },
  {
    type: "password",
    name: "password",
    message: "请输入密码",
    default: "123456",
  },
  {
    type: "rawlist",
    name: "rawlist",
    message: "请选择一个你喜欢的颜色",
    choices: ["red", "green", "blue"],
    default: "red",
  },
];

const program = new Command();

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version)
  .helpOption("-h, --help", "sg-cli 帮助文档");

// create 命令
program
  .command("create")
  .description("创建一个新项目")
  .action(async (e) => {
    const config = await inquirer.prompt(choseList);
    console.log(config);
  });

program
  .command("loading")
  .description("测试加载动画")
  .action(async () => {
    await loading.start("加载中");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    loading.update("加载状态更新中");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    loading.warn("加载警告");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    loading.fail("加载失败");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    loading.succeed("加载成功");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    loading.stop();
  });

program
  .command("chalk")
  .description("测试chalk")
  .action(() => {
    console.log(chalk.success("成功"));
    console.log(chalk.error("错误"));
    console.log(chalk.warning("警告"));
    console.log(chalk.info("信息"));
    console.log(chalk.underline("下划线"));
    console.log(chalk.bold("加粗"));
  });

program.parse(process.argv); // 解析命令行参数

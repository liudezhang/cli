import chalk from "@/utils/chalk";
import fs from "@/utils/fs";
import { exec, execSync } from "child_process";
import inquirer, { Answers, QuestionCollection } from "inquirer";

import { IProjectConfig, projectDir, projectGit } from "@/config/projectMap";
import loading from "@/utils/loading";

export default async function (projectName: string, cmd: any) {
  /* ---------------------------------- 前置校验 ---------------------------------- */
  function createCheck(): boolean | { isCreate: boolean; force: boolean } {
    // 1. 检查项目名是否合法
    // 项目名只能包含字母、数字、下划线、中划线 必须以字母开头
    const reg = /^[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9]$/;
    if (!reg.test(projectName)) {
      chalk.log("项目名不合法", "error");
      return false;
    }

    // 2. 检查项目名是否已存在
    const isExists = fs.existsSync(projectName);
    if (isExists) {
      chalk.log("项目已存在", "error");

      // 3. 检查是否强制创建
      if (cmd.force) {
        chalk.log("强制创建项目", "warning");
        return {
          isCreate: true,
          force: true,
        };
      } else {
        chalk.log("请更换项目名", "info");
        return false;
      }
    } else {
      return true;
    }
  }

  try {
    const isCreate = createCheck();

    // 项目名不合法或者项目已存在且不强制创建则不创建项目
    if (
      !isCreate ||
      (typeof isCreate === "object" && isCreate.isCreate && !isCreate.force)
    ) {
      return;
    }

    // 项目已存在且强制创建则删除项目
    if (typeof isCreate === "object" && isCreate.isCreate && isCreate.force) {
      fs.removeSync(projectName);
    }

    /* --------------------------------- 项目创建流程 --------------------------------- */
    // 1. 创建项目目录

    // 2. 下载模板
    // 使用 git clone 命令下载模板

    // 移动模板文件到项目目录
    const projectPath = `${process.cwd()}\\${projectName}`;

    // 判断模板文件是否存在
    if (fs.existsSync(projectDir)) {
      fs.removeSync(projectDir);
    }

    loading.start("模板下载中");
    const result = execSync(`git clone ${projectGit}`, {
      cwd: process.cwd(),
      encoding: "utf-8",
    });

    if (result) {
      loading.fail("模板下载失败");
      console.log(result);
      return;
    }
    // 获取项目模板文件夹
    let templatePath = `${process.cwd()}\\${projectDir}`;
    loading.succeed("模板下载成功");
    const projectJson = fs.readJsonSync(templatePath + "/project.json");

    const questions = [
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
          };
        }),
      },
    ] as QuestionCollection<Answers>[];

    const { template } = await inquirer.prompt(questions);

    // 移动模板文件到项目目录
    fs.moveSync(templatePath + "\\" + template, projectPath, {
      overwrite: true,
    });
    chalk.log("项目创建成功", "success");
    removeProjectDir(projectDir);

    // 3. 安装依赖
    // 3.1 选择包管理工具
    const { packageManager } = await inquirer.prompt([
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
    ]);

    // 3.2 安装依赖
    chalk.log("开始安装依赖");
    execSync(`cd ${projectName} && git init && ${packageManager} install`, {
      stdio: "inherit", // 打印子进程的输出
    });
    chalk.log("依赖安装成功", "success");

    // 4. 安装完成

    // 5. 打印提示信息
  } catch (error) {
    console.log(error);
    chalk.log("项目创建失败", "error");
    loading.stop();
    // 删除模板文件
    removeProjectDir(projectDir);
  }
}

const removeProjectDir = (projectName: string) => {
  fs.remove(process.cwd() + "\\" + projectName).catch((error) => {
    chalk.log(
      "删除模板文件失败 请手动删除【" + projectName + "】目录",
      "error"
    );
  });
};

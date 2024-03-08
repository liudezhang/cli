import chalk from "@/utils/chalk.js";

export default function (projectName: string, cmd: any) {
  // 前置校验
  // 1. 检查项目名是否合法
  // 2. 检查项目名是否已存在
  // 3. 检查是否强制创建

  if (cmd.force) {
    console.log(chalk.success("强制创建项目"));
  }

  // 项目创建流程
  // 1. 创建项目目录
  // 2. 下载模板
  // 3. 安装依赖
  // 4. 安装完成
  // 5. 打印提示信息
}

import chalk from "@/utils/chalk";
import { promisify } from "util";
const exec = promisify(require("child_process").exec);

const osPlatform = process.platform;

function isRoot() {
  return process.geteuid && process.geteuid() === 0;
}

async function isAdmin() {
  try {
    // 使用 `NET SESSION` 命令来检查当前用户会话的权限
    const { stdout } = await exec("NET SESSION");
    return !stdout.toLowerCase().includes("access is denied"); // 如果没有访问被拒绝，则表示具有管理员权限
  } catch (error) {
    return false;
  }
}

export default async function () {
  const isAdministrator = osPlatform === "linux" ? isRoot() : await isAdmin();
  !isAdministrator && chalk.log("请使用管理员权限运行", "error");
  return isAdministrator;
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("@/utils/chalk"));
const util_1 = require("util");
const exec = (0, util_1.promisify)(require("child_process").exec);
const osPlatform = process.platform;
function isRoot() {
    return process.geteuid && process.geteuid() === 0;
}
async function isAdmin() {
    try {
        // 使用 `NET SESSION` 命令来检查当前用户会话的权限
        const { stdout } = await exec("NET SESSION");
        return !stdout.toLowerCase().includes("access is denied"); // 如果没有访问被拒绝，则表示具有管理员权限
    }
    catch (error) {
        return false;
    }
}
async function default_1() {
    const isAdministrator = osPlatform === "linux" ? isRoot() : await isAdmin();
    !isAdministrator && chalk_1.default.log("请使用管理员权限运行", "error");
    return isAdministrator;
}
exports.default = default_1;

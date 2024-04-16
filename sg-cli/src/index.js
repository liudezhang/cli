#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const index_1 = __importDefault(require("./commands/index"));
const package_json_1 = __importDefault(require("../package.json"));
const isAdministrator_1 = __importDefault(require("@/utils/isAdministrator"));
const program = new commander_1.Command();
program
    .name(package_json_1.default.name)
    .version(package_json_1.default.version)
    .description(package_json_1.default.description)
    .helpOption("-h, --help", "显示帮助信息")
    .usage("<command> [options]");
Object.keys(index_1.default).forEach((command) => {
    const value = index_1.default[command]; // 获取命令的值
    const cmd = program.command(command); // 创建命令
    // 设置命令前置钩子 (判断是否是管理员权限)
    cmd.hook("preAction", async (thisCommand, actionCommand) => {
        if (!(await (0, isAdministrator_1.default)())) {
            process.exit(1); // 如果不是管理员则退出进程
        }
    });
    cmd.description(value.description); // 设置命令描述
    // 设置命令选项
    value.options.forEach((option) => {
        cmd.option(option.cmd, option.description);
    });
    // 设置命令执行动作
    cmd.action(value.actions);
});
program.parse(process.argv);

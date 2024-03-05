#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ora_1 = __importDefault(require("ora"));
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
const loading = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const spinner = (0, ora_1.default)(msg);
    spinner.start();
    try {
        const res = yield new Promise((resolve) => {
            setTimeout(() => {
                resolve(msg);
            }, 2000);
        });
        spinner.succeed("加载成功");
        return Promise.resolve(res);
    }
    catch (error) {
        spinner.fail("加载失败");
        return Promise.reject(error);
    }
});
loading("加载中").then((res) => {
    console.log("res", res);
});

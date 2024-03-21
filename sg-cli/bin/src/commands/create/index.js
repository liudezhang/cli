var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import chalk from "../../utils/chalk";
import fs from "../../utils/fs";
import { exec, execSync } from "child_process";
import inquirer from "inquirer";
import { projectDir, projectGit } from "../../config/projectMap";
import loading from "../../utils/loading";
export default function (projectName, cmd) {
    return __awaiter(this, void 0, void 0, function () {
        function createCheck() {
            var reg = /^[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9]$/;
            if (!reg.test(projectName)) {
                chalk.log("项目名不合法", "error");
                return false;
            }
            var isExists = fs.existsSync(projectName);
            if (isExists) {
                chalk.log("项目已存在", "error");
                if (cmd.force) {
                    chalk.log("强制创建项目", "warning");
                    return {
                        isCreate: true,
                        force: true,
                    };
                }
                else {
                    chalk.log("请更换项目名", "info");
                    return false;
                }
            }
            else {
                return true;
            }
        }
        var isCreate, projectPath, result, templatePath, projectJson, template, packageManager, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    isCreate = createCheck();
                    if (!isCreate ||
                        (typeof isCreate === "object" && isCreate.isCreate && !isCreate.force)) {
                        return [2];
                    }
                    if (typeof isCreate === "object" && isCreate.isCreate && isCreate.force) {
                        fs.removeSync(projectName);
                    }
                    projectPath = "".concat(process.cwd(), "\\").concat(projectName);
                    if (fs.existsSync(projectDir)) {
                        fs.removeSync(projectDir);
                    }
                    chalk.logWithTime("开始下载模板");
                    loading.start("模板下载中", {
                        stream: process.stdout,
                    });
                    return [4, new Promise(function (resolve) {
                            return exec("git clone ".concat(projectGit), function (error) { return resolve(error); });
                        })];
                case 1:
                    result = _a.sent();
                    loading.stop();
                    chalk.logWithTime("模板下载完成");
                    if (result) {
                        loading.fail("模板下载失败");
                        console.log(result, "模板下载失败");
                        return [2];
                    }
                    templatePath = "".concat(process.cwd(), "\\").concat(projectDir);
                    loading.succeed("模板下载成功");
                    projectJson = fs.readJsonSync(templatePath + "/project.json");
                    return [4, inquirer.prompt([
                            {
                                name: "template",
                                type: "list",
                                message: "请选择模板",
                                choices: projectJson.map(function (item) {
                                    return {
                                        name: item.name,
                                        key: item.key,
                                        value: item.value,
                                        description: item.description,
                                    };
                                }),
                            },
                        ])];
                case 2:
                    template = (_a.sent()).template;
                    fs.moveSync("".concat(templatePath, "\\").concat(template), projectPath, {
                        overwrite: true,
                    });
                    chalk.log("项目创建成功", "success");
                    removeProjectDir(projectDir);
                    return [4, inquirer.prompt([
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
                        ])];
                case 3:
                    packageManager = (_a.sent()).packageManager;
                    chalk.log("开始安装依赖");
                    execSync("cd ".concat(projectName, " && git init && ").concat(packageManager, " install"), {
                        stdio: "inherit",
                    });
                    chalk.log("依赖安装成功", "success");
                    return [3, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    chalk.log("项目创建失败", "error");
                    loading.stop();
                    removeProjectDir(projectDir);
                    process.exit();
                    return [3, 5];
                case 5: return [2];
            }
        });
    });
}
var removeProjectDir = function (projectName) {
    fs.remove(process.cwd() + "\\" + projectName).catch(function (error) {
        chalk.log("删除模板文件失败 请手动删除【" + projectName + "】目录", "error");
    });
};

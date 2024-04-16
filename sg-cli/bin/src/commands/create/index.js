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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var inquirer_1 = __importDefault(require("inquirer"));
var projectMap_1 = require("../../config/projectMap");
var loading_1 = __importDefault(require("../../utils/loading"));
var chalk_1 = __importDefault(require("../../utils/chalk"));
var fs_1 = __importDefault(require("../../utils/fs"));
function default_1(projectName, cmd) {
    return __awaiter(this, void 0, void 0, function () {
        var reg, isExists, isCover, projectPath, result, templatePath, projectJson, _a, template, packageManager, description, packageJsonPath, packageJson, packageScript, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 11, , 12]);
                    reg = /^[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9]$/;
                    if (!reg.test(projectName)) {
                        chalk_1.default.log("项目名不合法", "error");
                        return [2];
                    }
                    isExists = fs_1.default.existsSync(projectName);
                    if (!cmd.force) return [3, 2];
                    loading_1.default.start("删除 " + projectName + " 项目中");
                    return [4, fs_1.default.remove(projectName)];
                case 1:
                    _b.sent();
                    loading_1.default.succeed("删除 " + projectName + " 项目成功");
                    _b.label = 2;
                case 2:
                    if (!isExists) return [3, 6];
                    return [4, inquirer_1.default.prompt([
                            {
                                name: "isCover",
                                type: "confirm",
                                message: "项目已存在 是否覆盖",
                            },
                        ])];
                case 3:
                    isCover = (_b.sent()).isCover;
                    if (!isCover) return [3, 5];
                    loading_1.default.start("删除 " + projectName + " 项目中");
                    return [4, fs_1.default.remove(projectName)];
                case 4:
                    _b.sent();
                    loading_1.default.succeed("删除 " + projectName + " 项目成功");
                    return [3, 6];
                case 5: return [2];
                case 6:
                    projectPath = "".concat(process.cwd(), "\\").concat(projectName);
                    if (!fs_1.default.existsSync(projectMap_1.projectDir)) return [3, 8];
                    return [4, fs_1.default.remove(projectMap_1.projectDir)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    loading_1.default.start("模板下载中", {
                        stream: process.stdout,
                    });
                    return [4, new Promise(function (resolve) {
                            return (0, child_process_1.exec)("git clone ".concat(projectMap_1.projectGit), function (error) { return resolve(error); });
                        })];
                case 9:
                    result = _b.sent();
                    if (result) {
                        loading_1.default.fail("模板下载失败");
                        console.log(result, "模板下载失败");
                        return [2];
                    }
                    templatePath = "".concat(process.cwd(), "\\").concat(projectMap_1.projectDir);
                    loading_1.default.succeed("模板下载成功");
                    loading_1.default.stop();
                    projectJson = fs_1.default.readJsonSync(templatePath + "/project.json");
                    return [4, inquirer_1.default.prompt([
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
                            {
                                name: "description",
                                type: "input",
                                message: "请输入项目描述",
                                default: "",
                            },
                        ])];
                case 10:
                    _a = _b.sent(), template = _a.template, packageManager = _a.packageManager, description = _a.description;
                    fs_1.default.moveSync("".concat(templatePath, "\\").concat(template), projectPath, {
                        overwrite: true,
                    });
                    removeProjectDir(projectMap_1.projectDir);
                    packageJsonPath = "".concat(projectPath, "\\package.json");
                    packageJson = fs_1.default.readJsonSync(packageJsonPath);
                    packageScript = Object.keys(packageJson.scripts);
                    packageJson.name = projectName;
                    packageJson.version = "1.0.0";
                    packageJson.description = description;
                    fs_1.default.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
                    chalk_1.default.log("开始安装依赖");
                    (0, child_process_1.execSync)("cd ".concat(projectName, " && git init && ").concat(packageManager, " install"), {
                        stdio: "inherit",
                    });
                    chalk_1.default.log("依赖安装成功", "success");
                    chalk_1.default.log("项目创建成功", "success");
                    return [3, 12];
                case 11:
                    error_1 = _b.sent();
                    console.log(error_1);
                    chalk_1.default.log("项目创建失败", "error");
                    loading_1.default.stop();
                    removeProjectDir(projectMap_1.projectDir);
                    process.exit();
                    return [3, 12];
                case 12: return [2];
            }
        });
    });
}
exports.default = default_1;
var removeProjectDir = function (projectName) {
    fs_1.default.remove(process.cwd() + "\\" + projectName).catch(function (error) {
        chalk_1.default.log("删除模板文件失败 请手动删除【" + projectName + "】目录", "error");
    });
};

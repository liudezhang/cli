"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loading_1 = __importDefault(require("@/utils/loading"));
const index_1 = __importDefault(require("./create/index"));
const commands = {
    "create <project-name>": {
        description: "创建一个新项目",
        options: [
            {
                cmd: "-f, --force",
                description: "强制创建项目",
            },
        ],
        actions: index_1.default,
    },
    test: {
        description: "测试",
        options: [],
        actions: async () => {
            loading_1.default.start("测试");
            await new Promise((res) => setTimeout(res, 1000));
            loading_1.default.succeed("测试成功");
        },
    },
};
exports.default = commands;

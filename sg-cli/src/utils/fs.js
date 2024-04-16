"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const customFs = {
    fun(path, options, callback) {
        console.log("自定义fs模块的");
    },
};
exports.default = {
    ...fs_extra_1.default,
};

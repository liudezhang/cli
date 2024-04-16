"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Chalk {
    constructor() { }
    success(text) {
        return chalk_1.default.green(text);
    }
    error(text) {
        return chalk_1.default.red(text);
    }
    warning(text) {
        return chalk_1.default.yellow(text);
    }
    info(text) {
        return chalk_1.default.hex("#c5c5c5")(text);
    }
    underline(text) {
        return chalk_1.default.underline(text);
    }
    bold(text) {
        return chalk_1.default.bold(text);
    }
    dim(text) {
        return chalk_1.default.dim(text);
    }
    log(text, type = "info") {
        console.log(this[type](text));
    }
    logWithTime(text, type = "info") {
        const time = new Date().toLocaleTimeString();
        console.log(this[type](`[${time}] ${text}`));
    }
    // 个性化颜色
    hex(color) {
        return chalk_1.default.hex(color);
    }
    // 背景颜色
    bgHex(color) {
        return chalk_1.default.bgHex(color);
    }
}
exports.default = new Chalk();

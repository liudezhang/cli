"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ora_1 = __importDefault(require("ora"));
class Loading {
    spinner;
    constructor() {
        this.spinner = (0, ora_1.default)();
    }
    /**
     * 启动加载动画
     * @param textOrOptions - 加载文本
     * @param customOptions - 自定义加载选项
     * @returns Promise<void>
     */
    start(textOrOptions, customOptions) {
        this.spinner = (0, ora_1.default)({ text: textOrOptions, ...customOptions });
        this.spinner.start();
    }
    /**
     * 更新加载文本
     * @param text - 新的加载文本
     */
    update(text) {
        this.spinner.text = text;
    }
    /**
     * 停止加载动画
     */
    stop() {
        this.spinner.stop();
    }
    /**
     * 显示加载成功消息
     * @param text - 成功文本
     */
    succeed(text) {
        this.spinner.succeed(text);
    }
    /**
     * 显示加载失败消息
     * @param text - 失败文本
     */
    fail(text) {
        this.spinner.fail(text);
    }
    /**
     * 显示警告消息
     * @param text - 警告文本
     */
    warn(text) {
        this.spinner.warn(text);
    }
    /**
     * 显示信息消息
     * @param text - 信息文本
     */
    info(text) {
        this.spinner.info(text);
    }
}
exports.default = new Loading();

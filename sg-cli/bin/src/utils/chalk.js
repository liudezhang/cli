"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var Chalk = (function () {
    function Chalk() {
    }
    Chalk.prototype.success = function (text) {
        return chalk_1.default.green(text);
    };
    Chalk.prototype.error = function (text) {
        return chalk_1.default.red(text);
    };
    Chalk.prototype.warning = function (text) {
        return chalk_1.default.yellow(text);
    };
    Chalk.prototype.info = function (text) {
        return chalk_1.default.hex("#c5c5c5")(text);
    };
    Chalk.prototype.underline = function (text) {
        return chalk_1.default.underline(text);
    };
    Chalk.prototype.bold = function (text) {
        return chalk_1.default.bold(text);
    };
    Chalk.prototype.dim = function (text) {
        return chalk_1.default.dim(text);
    };
    Chalk.prototype.log = function (text, type) {
        if (type === void 0) { type = "info"; }
        console.log(this[type](text));
    };
    Chalk.prototype.logWithTime = function (text, type) {
        if (type === void 0) { type = "info"; }
        var time = new Date().toLocaleTimeString();
        console.log(this[type]("[".concat(time, "] ").concat(text)));
    };
    return Chalk;
}());
exports.default = new Chalk();

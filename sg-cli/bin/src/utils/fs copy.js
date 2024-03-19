"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var Fs = (function () {
    function Fs() {
        this.fsExtra = fs_extra_1.default;
    }
    Fs.prototype.readFileSync = function (path, encoding) {
        if (encoding === void 0) { encoding = "utf-8"; }
        return fs_extra_1.default.readFileSync(path, { encoding: encoding });
    };
    Fs.prototype.writeFileSync = function (path, data, encoding) {
        if (encoding === void 0) { encoding = "utf-8"; }
        return fs_extra_1.default.writeFileSync(path, data, { encoding: encoding });
    };
    Fs.prototype.existsSync = function (path) {
        return fs_extra_1.default.existsSync(path);
    };
    Fs.prototype.copyFileSync = function (src, dest) {
        return fs_extra_1.default.copyFileSync(src, dest);
    };
    Fs.prototype.mkdirSync = function (path) {
        return fs_extra_1.default.mkdirSync(path);
    };
    Fs.prototype.readdirSync = function (path, options, callback) {
        return fs_extra_1.default.readdir(path, options, callback);
    };
    Fs.prototype.rmdirSync = function (path) {
        return fs_extra_1.default.rmdirSync(path, { recursive: true });
    };
    Fs.prototype.renameSync = function (oldPath, newPath) {
        return fs_extra_1.default.renameSync(oldPath, newPath);
    };
    Fs.prototype.rmSync = function (path, options) {
        return fs_extra_1.default.rmSync(path, options);
    };
    Fs.prototype.copySync = function (src, dest, options) {
        if (options === void 0) { options = {}; }
        return fs_extra_1.default.copySync(src, dest, options);
    };
    Fs.prototype.moveSync = function (src, dest, options) {
        if (options === void 0) { options = {}; }
        return fs_extra_1.default.moveSync(src, dest, options);
    };
    Fs.prototype.removeSync = function (path) {
        return fs_extra_1.default.removeSync(path);
    };
    Fs.prototype.remove = function (path) {
        return fs_extra_1.default.remove(path);
    };
    return Fs;
}());
exports.default = new Fs();

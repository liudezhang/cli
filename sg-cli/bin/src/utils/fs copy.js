import fs from "fs-extra";
var Fs = (function () {
    function Fs() {
        this.fsExtra = fs;
    }
    Fs.prototype.readFileSync = function (path, encoding) {
        if (encoding === void 0) { encoding = "utf-8"; }
        return fs.readFileSync(path, { encoding: encoding });
    };
    Fs.prototype.writeFileSync = function (path, data, encoding) {
        if (encoding === void 0) { encoding = "utf-8"; }
        return fs.writeFileSync(path, data, { encoding: encoding });
    };
    Fs.prototype.existsSync = function (path) {
        return fs.existsSync(path);
    };
    Fs.prototype.copyFileSync = function (src, dest) {
        return fs.copyFileSync(src, dest);
    };
    Fs.prototype.mkdirSync = function (path) {
        return fs.mkdirSync(path);
    };
    Fs.prototype.readdirSync = function (path, options, callback) {
        return fs.readdir(path, options, callback);
    };
    Fs.prototype.rmdirSync = function (path) {
        return fs.rmdirSync(path, { recursive: true });
    };
    Fs.prototype.renameSync = function (oldPath, newPath) {
        return fs.renameSync(oldPath, newPath);
    };
    Fs.prototype.rmSync = function (path, options) {
        return fs.rmSync(path, options);
    };
    Fs.prototype.copySync = function (src, dest, options) {
        if (options === void 0) { options = {}; }
        return fs.copySync(src, dest, options);
    };
    Fs.prototype.moveSync = function (src, dest, options) {
        if (options === void 0) { options = {}; }
        return fs.moveSync(src, dest, options);
    };
    Fs.prototype.removeSync = function (path) {
        return fs.removeSync(path);
    };
    Fs.prototype.remove = function (path) {
        return fs.remove(path);
    };
    return Fs;
}());
export default new Fs();

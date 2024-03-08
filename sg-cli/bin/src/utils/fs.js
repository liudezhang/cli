import fs from "fs";
var Fs = (function () {
    function Fs() {
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
    Fs.prototype.mkdirSync = function (path) {
        return fs.mkdirSync(path);
    };
    Fs.prototype.readdirSync = function (path, options, callback) {
        return fs.readdir(path, options, callback);
    };
    Fs.prototype.unlinkSync = function (path) {
        return fs.unlinkSync(path);
    };
    Fs.prototype.rmdirSync = function (path) {
        return fs.rmdirSync(path);
    };
    Fs.prototype.renameSync = function (oldPath, newPath) {
        return fs.renameSync(oldPath, newPath);
    };
    return Fs;
}());
export default new Fs();

import chalk from "chalk";
var Chalk = (function () {
    function Chalk() {
    }
    Chalk.prototype.success = function (text) {
        return chalk.green(text);
    };
    Chalk.prototype.error = function (text) {
        return chalk.red(text);
    };
    Chalk.prototype.warning = function (text) {
        return chalk.yellow(text);
    };
    Chalk.prototype.info = function (text) {
        return chalk.hex("#c5c5c5")(text);
    };
    Chalk.prototype.underline = function (text) {
        return chalk.underline(text);
    };
    Chalk.prototype.bold = function (text) {
        return chalk.bold(text);
    };
    Chalk.prototype.dim = function (text) {
        return chalk.dim(text);
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
export default new Chalk();

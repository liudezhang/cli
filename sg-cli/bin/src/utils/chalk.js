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
        return chalk.blue(text);
    };
    Chalk.prototype.underline = function (text) {
        return chalk.underline(text);
    };
    Chalk.prototype.bold = function (text) {
        return chalk.bold(text);
    };
    return Chalk;
}());
export default new Chalk();

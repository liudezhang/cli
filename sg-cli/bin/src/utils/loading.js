"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ora_1 = __importDefault(require("ora"));
var Loading = (function () {
    function Loading(defaultOptions) {
        if (defaultOptions === void 0) { defaultOptions = {}; }
        this.defaultOptions = defaultOptions;
        this.spinner = (0, ora_1.default)(defaultOptions);
    }
    Loading.prototype.start = function (textOrOptions, customOptions) {
        if (typeof textOrOptions === "string") {
            this.spinner = (0, ora_1.default)(__assign(__assign({}, this.defaultOptions), customOptions));
            this.spinner.start(textOrOptions);
        }
        else {
            this.spinner = (0, ora_1.default)(__assign(__assign({}, this.defaultOptions), textOrOptions));
            this.spinner.start();
        }
        return new Promise(function (resolve) {
            resolve();
        });
    };
    Loading.prototype.update = function (text) {
        this.spinner.text = text;
    };
    Loading.prototype.stop = function () {
        this.spinner.stop();
    };
    Loading.prototype.succeed = function (text) {
        this.spinner.succeed(text);
    };
    Loading.prototype.fail = function (text) {
        this.spinner.fail(text);
    };
    Loading.prototype.warn = function (text) {
        this.spinner.warn(text);
    };
    Loading.prototype.info = function (text) {
        this.spinner.info(text);
    };
    return Loading;
}());
exports.default = new Loading();

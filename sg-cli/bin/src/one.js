"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = __importDefault(require("inquirer"));
var questions = [
    {
        name: "template",
        type: "expand",
        message: "请选择模板",
        choices: [
            {
                name: "react",
                value: "react",
            },
        ],
    },
];
inquirer_1.default
    .prompt([
    {
        name: "template",
        type: "expand",
        message: "请选择模板",
        choices: [
            {
                name: "react",
                value: "react",
                description: "react模板",
            },
        ],
    },
])
    .then(function (answers) {
    console.log(answers, "answers");
});

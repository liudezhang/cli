#! /usr/bin/env node
import fs from "fs";
import { Command } from "commander";
import commands from "./commands/index.js";
var packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
var program = new Command();
program
    .name(packageJson.name)
    .version(packageJson.version)
    .description(packageJson.description)
    .helpOption("-h, --help", "显示帮助信息")
    .usage("<command> [options]");
Object.keys(commands).forEach(function (command) {
    var value = commands[command];
    var cmd = program.command(command);
    cmd.description(value.description);
    value.options.forEach(function (option) {
        cmd.option(option.cmd, option.description);
    });
    cmd.action(value.actions);
});
program.parse();

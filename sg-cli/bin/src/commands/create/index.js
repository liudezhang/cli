import chalk from "../../utils/chalk.js";
export default function (projectName, cmd) {
    if (cmd.force) {
        console.log(chalk.success("强制创建项目"));
    }
}

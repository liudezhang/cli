import commandCreate from "./create/index.js";
var commands = {
    "create <project-name>": {
        description: "创建一个新项目",
        options: [
            {
                cmd: "-f, --force",
                description: "强制创建项目",
            },
        ],
        actions: commandCreate,
    },
};
export default commands;

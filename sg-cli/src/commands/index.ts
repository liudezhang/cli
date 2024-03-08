import commandCreate from "./create/index.js";

interface ICommands {
  [key: string]: {
    description: string;
    options: {
      cmd: string;
      description: string;
    }[];
    actions: (...args: any[]) => void;
  };
}

const commands: ICommands = {
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

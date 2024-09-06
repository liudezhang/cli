import commandLint from "./lint"
import commandCreate from "./create"
import commandTest from "./test"
import commandTemplate from "./template"
import commandAdd from "./add"
import commandCommit from "./commit"
import commandGitkeep from "./gitkeep"

interface ICommands {
  [key: string]: {
    description: string
    options?: {
      cmd: string
      description: string
    }[]
    alias?: string[]
    actions: (...args: any[]) => void
  }
}

const commands: ICommands = {
  test: {
    description: "测试",
    options: [],
    actions: commandTest,
  },
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
  lint: {
    description: "添加代码检查配置",
    options: [],
    actions: commandLint,
  },
  template: {
    description: "查看项目模板",
    options: [],
    actions: commandTemplate,
  },
  add: {
    description: "添加配置文件",
    options: [],
    actions: commandAdd,
  },
  commit: {
    description: "git commit格式",
    options: [],
    alias: ["cz"],
    actions: commandCommit,
  },
  gitkeep: {
    description: ".gitkeep文件",
    options: [
      {
        cmd: "-a",
        description: "给当前目录下的所有空目录创建.gitkeep文件",
      },
      {
        cmd: "-d",
        description: "检查当前目录下的所有非空目录删除.gitkeep文件",
      },
      {
        cmd: "-r",
        description: "检查当前目录下的所有目录删除.gitkeep文件",
      },
    ],
    actions: commandGitkeep,
  },
}

export default commands

import commandLint from "./lint"
import commandCreate from "./create"
import commandTest from "./test"
import commandTemplate from "./template"
import commandAdd from "./add"
import commandCommit from "./commit"

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
  test: {
    description: "测试",
    options: [],
    actions: commandTest,
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
}

export default commands

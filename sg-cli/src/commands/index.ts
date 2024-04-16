import loading from "@/utils/loading"
import commandCreate from "./create/index"

interface ICommands {
  [key: string]: {
    description: string
    options: {
      cmd: string
      description: string
    }[]
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
    actions: async () => {
      loading.start("测试")
      await new Promise((res) => setTimeout(res, 1000))
      loading.succeed("测试成功")
    },
  },
}

export default commands

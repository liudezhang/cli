import { fileNameMap } from "@/profile"
import fs from "@/utils/fs"
import loading from "@/utils/loading"
import { prompt } from "inquirer"

export default async function () {
  try {
    const { config } = await prompt([
      {
        type: "checkbox",
        name: "config",
        message: "请选择要添加的配置文件\n",
        choices: Object.keys(fileNameMap).map((key) => ({
          name: key,
          value: key,
        })),
        // validate: (value) => {
        //   if (value.length === 0) {
        //     return "至少选择一个配置文件"
        //   }
        //   return true
        // },
      },
    ])

    loading.start("正在添加配置文件\n")
    // 写入配置文件
    config.length &&
      config.forEach((key: keyof typeof fileNameMap) => {
        fs.writeFileSync(key, fileNameMap[key])
      })
    loading.succeed("配置文件添加成功")
  } catch (error) {
    console.log(error)
  }
}

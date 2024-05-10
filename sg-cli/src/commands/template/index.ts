import { getProjectJson } from "@/utils/project"

export default async function () {
  try {
    const projectJson = await getProjectJson()

    const showJson = projectJson.map((item: any) => ({
      模板名称: item.name,
      模板描述: item.description,
    }))

    console.table(showJson)
  } catch (error) {
    console.log(error, "error")
  }
}

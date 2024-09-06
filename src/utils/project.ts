import fetch from "node-fetch"
import { projectJsonPath } from "@/config/projectMap"

export const getProjectJson = async () => {
  let json = null
  try {
    const res = await fetch(projectJsonPath)
    if (res.ok) {
      const projectJson = await res.json()
      json = projectJson
    }
  } catch (error) {
    console.log(error, "error")
  }

  return json
}

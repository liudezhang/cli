export const projectDir = "project_template"
export const projectGit = "https://gitee.com/liudezhang/project_template.git"
export const projectJsonPath =
  "https://gitee.com/liudezhang/project_template/raw/main/project.json"
export interface IProjectConfig {
  name: string
  value: string
  key: string | number
  description: string
}

export type ProjectList = IProjectConfig[]

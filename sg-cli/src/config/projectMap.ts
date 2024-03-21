export const projectDir = "project_template"
export const projectGit = "https://github.com/liudezhang/project_template.git"

export interface IProjectConfig {
  name: string
  value: string
  key: string | number
  description: string
}

export type ProjectList = IProjectConfig[]

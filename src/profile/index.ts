import fs from "@/utils/fs"
import { resolve } from "node:path"

function requireFile(filePath: string) {
  return fs.readFileSync(resolve(__dirname, filePath), "utf-8")
}

const prettierConfigJs = requireFile("./files/prettier/prettier.config.js")
const eslintignore = requireFile("./files/eslint/.eslintignore")
const prettierignore = requireFile("./files/prettier/.prettierignore")
const editorconfig = requireFile("./files/editorconfig/.editorconfig")
const gitignore = requireFile("./files/git/.gitignore")

export const fileNameMap = {
  "prettier.config.js": prettierConfigJs,
  ".eslintignore": eslintignore,
  ".prettierignore": prettierignore,
  ".editorconfig": editorconfig,
  ".gitignore": gitignore,
}

export {
  prettierConfigJs,
  eslintignore,
  prettierignore,
  editorconfig,
  gitignore,
}

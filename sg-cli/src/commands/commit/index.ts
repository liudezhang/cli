import inquirer from "inquirer"
import { commitPrompt, commitTemplate } from "./config"
import { execSync } from "child_process"

export default async function () {
  console.log("commit")

  const answers = await inquirer.prompt(commitPrompt)
  const commitMessage = commitTemplate(answers)
  console.log(commitMessage)
  const { isUpdateCommitMessage } = await inquirer.prompt({
    type: "confirm",
    name: "isUpdateCommitMessage",
    message: `是否修改提交信息\n`,
    default: false,
  })
  let commitMessageTemp = null
  if (isUpdateCommitMessage) {
    await inquirer
      .prompt({
        type: "editor",
        name: "updateCommitMessage",
        message: "修改提交信息",
        default: commitMessage,
      })
      .then(({ updateCommitMessage }) => {
        commitMessageTemp = updateCommitMessage
      })
  }

  const commitMessageFinal = commitMessageTemp || commitMessage

  inquirer
    .prompt({
      type: "confirm",
      name: "isCommit",
      message: `是否提交`,
      default: true,
    })
    .then(({ isCommit }) => {
      if (isCommit) {
        execSync(`git commit -m "${commitMessageFinal}"`, {
          stdio: "inherit",
        })
      }
    })
}

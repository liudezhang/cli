const subjectLength = 30
const icon = true
const emoji = false

import { IType, ICommitDetail } from "./types"

export const typeList: IType[] = [
  {
    label: "init",
    detail: "项目初始化",
    icon: "🎉 ",
    emoji: ":zap:",
  },
  {
    label: "feat",
    detail: "新功能",
    icon: "✨ ",
    emoji: ":sparkles:",
  },
  {
    label: "fix",
    detail: "修复 bug",
    icon: "🐛 ",
    emoji: ":bug:",
  },
  {
    label: "docs",
    detail: "文档修改",
    icon: "📝 ",
    emoji: ":memo:",
  },
  {
    label: "style",
    detail: "代码格式修改",
    icon: "💄 ",
    emoji: ":lipstick:",
  },
  {
    label: "refactor",
    detail: " 重构",
    icon: "♻️ ",
    emoji: ":recycle:",
  },
  {
    label: "perf",
    detail: "性能优化",
    icon: "⚡️ ",
    emoji: ":zap:",
  },
  {
    label: "test",
    detail: "测试相关",
    icon: "✅ ",
    emoji: ":white_check_mark:",
  },
  {
    label: "build",
    detail: "构建过程修改",
    icon: "👷 ",
    emoji: ":construction_worker:",
  },
  {
    label: "ci",
    detail: "CI 配置",
    icon: "💚 ",
    emoji: ":green_heart:",
  },
  {
    label: "chore",
    detail: "其他修改",
    icon: "💬 ",
    emoji: ":speech_balloon:",
  },
  {
    label: "revert",
    detail: "撤销",
    icon: "⏪ ",
    emoji: ":rewind:",
  },
]

export const commitDetailList: ICommitDetail[] = [
  {
    label: "Type",
    key: "type",
    description: "类型",
    detail: "选择本次提交的类型",
  },
  {
    label: "Scope",
    key: "scope",
    description: "修改范围",
    detail: "本次修改包含哪些模块",
  },
  {
    label: "Subject",
    key: "subject",
    description: "概述",
    detail: `提交概述，不超过${subjectLength}字符`,
  },
  {
    label: "Body",
    key: "body",
    description: "详情",
    detail: "填写更加详细的变更描述",
  },
  {
    label: "Footer",
    key: "footer",
    description: "备注",
    detail: "通常是修复 bug | issue 的链接",
  },
]

// git commit 模板
export const commitTemplateList = {
  angular: `<type>(<scope>): <subject><BLANK LINE><body><BLANK LINE><footer>`,
}

/**
 * 根据提供的答案和可选的提交模板，生成一个符合要求的提交信息。
 *
 * @param answers 一个包含提交信息各个部分的对象，如类型、范围、主题等。
 * @param commitTemplate 可选的提交模板，用于定制提交信息的结构和内容。
 * @returns 生成的符合模板要求的提交信息。
 * @throws 如果答案中缺少必要的字段，则抛出错误。
 */
export const commitTemplate = (
  answers: { [key: string]: string },
  commitTemplate?: string | undefined,
) => {
  // 解构答案中的各个字段
  const { type, scope, subject, body, footer } = answers

  // 定义必需的字段列表
  // 输入验证
  const requiredFields = ["type", "scope", "subject"]
  // 筛选出答案中缺失的必需字段
  const missingFields = requiredFields.filter((field) => !answers[field])
  // 如果有缺失的字段，抛出错误
  if (missingFields.length > 0) {
    throw new Error(`缺少必填字段: ${missingFields.join(", ")}`)
  }

  // 确定使用的模板，如果没有提供，则使用默认的Angular模板
  // 处理默认模板选择
  const templateTemp = commitTemplate || commitTemplateList.angular

  let commitMessage = ""
  try {
    commitMessage = templateTemp
      .replace("<type>", type)
      .replace("<scope>", scope)
      .replace("<subject>", subject)
      .replace("<body>", body)
      .replace("<footer>", footer)
      .replace(/<BLANK LINE>/g, "\n\n")
      .trim()
  } catch (error) {
    // 如果在替换过程中发生错误，抛出异常
    // 异常处理：将错误信息向上抛出而不是简单打印
    throw new Error(`commit message 生成失败: ${error}`)
  }

  // 返回生成的提交信息
  return commitMessage
}

export const commitPrompt = commitDetailList.map((item) => {
  if (item.key === "type") {
    return {
      type: "list",
      name: item.key,
      message: item.detail + "\n",
      pageSize: typeList.length,
      loop: false,
      choices: typeList.map((item) => {
        return {
          name: `${icon ? item.icon + " " : ""}${item.detail} ${
            emoji ? item.emoji : ""
          }`,
          value: `${icon ? item.icon + " " : ""}${item.label}: ${
            emoji ? item.emoji : ""
          }`,
        }
      }),
    }
  } else {
    return {
      type: "input",
      name: item.key,
      message: item.detail + "\n",
    }
  }
})

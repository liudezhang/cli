type CommitType =
  | "init"
  | "feat"
  | "fix"
  | "docs"
  | "style"
  | "refactor"
  | "perf"
  | "test"
  | "build"
  | "ci"
  | "chore"
  | "revert"

type Language = "zh-CN" | "en-US"

type LabelKey = "type" | "subject" | "scope" | "body" | "footer"

type Label = Capitalize<LabelKey>

export interface ICommitDetail {
  label: Label
  key: LabelKey // 注意这里是 LabelKey 而不是 Label
  description: string
  detail: string
}

export interface IType {
  label: CommitType
  detail: string
  icon: string
  emoji: string
}

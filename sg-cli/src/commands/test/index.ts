import { checkGitVersion } from "@/utils/git"
import loading from "@/utils/loading"
import { sleep } from "@/utils/utils"

export default async function () {
  loading.start("测试")
  await checkGitVersion()
  await sleep(1000)
  loading.succeed("测试成功 可以使用 🎉")
}

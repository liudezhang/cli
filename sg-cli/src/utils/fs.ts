import fs from "fs-extra"

const customFs = {
  fun(path: string, options: any, callback: any) {
    console.log("自定义fs模块的")
  },
}

export default {
  ...fs,
} as typeof fs & typeof customFs

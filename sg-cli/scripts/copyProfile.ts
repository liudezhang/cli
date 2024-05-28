// 拷贝目录脚本
// 用于拷贝文件夹到指定目录
// 用法：ts-node script/copyProfile.ts

import fs from "../src/utils/fs"

fs.copySync("./src/profile/files", "./bin/src/profile/files")

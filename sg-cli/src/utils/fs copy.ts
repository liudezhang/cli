import fs from "fs-extra"
import type {
  CopyOptionsSync,
  Dirent,
  MoveOptions,
  ObjectEncodingOptions,
  PathLike,
  RmOptions,
} from "fs-extra"

// fs 文件系统模块 类
class Fs {
  fsExtra = fs

  // 读取文件
  readFileSync(path: string, encoding: BufferEncoding = "utf-8") {
    return fs.readFileSync(path, { encoding })
  }

  // 写入文件
  writeFileSync(
    path: string,
    data: string,
    encoding: BufferEncoding = "utf-8",
  ) {
    return fs.writeFileSync(path, data, { encoding })
  }

  // 判断文件是否存在
  existsSync(path: string) {
    return fs.existsSync(path)
  }

  // 复制文件
  copyFileSync(src: string, dest: string) {
    return fs.copyFileSync(src, dest)
  }

  // 创建目录
  mkdirSync(path: string) {
    return fs.mkdirSync(path)
  }

  // 读取目录
  readdirSync(
    path: string,
    options: ObjectEncodingOptions & {
      withFileTypes: true
      recursive?: boolean | undefined
    },
    callback: (err: NodeJS.ErrnoException | null, files: Dirent[]) => void,
  ) {
    return fs.readdir(path, options, callback)
  }

  // 删除目录
  rmdirSync(path: string) {
    return fs.rmdirSync(path, { recursive: true })
  }

  // 重命名
  renameSync(oldPath: string, newPath: string) {
    return fs.renameSync(oldPath, newPath)
  }

  // fs-extra版本 (更牛逼的fs模块)

  // 删除文件 或 目录
  rmSync(path: PathLike, options: RmOptions | undefined) {
    return fs.rmSync(path, options)
  }

  // 复制
  copySync(src: string, dest: string, options: CopyOptionsSync = {}) {
    return fs.copySync(src, dest, options)
  }

  // 移动
  moveSync(src: string, dest: string, options: MoveOptions = {}) {
    return fs.moveSync(src, dest, options)
  }

  // 同步删除
  removeSync(path: string) {
    return fs.removeSync(path)
  }

  // 异步删除
  remove(path: string) {
    return fs.remove(path)
  }
}

export default new Fs()

import fs from "fs";
import type { Dirent, ObjectEncodingOptions } from "fs";

// fs 文件系统模块 类
class Fs {
  // 读取文件
  readFileSync(path: string, encoding: BufferEncoding = "utf-8") {
    return fs.readFileSync(path, { encoding });
  }

  // 写入文件
  writeFileSync(
    path: string,
    data: string,
    encoding: BufferEncoding = "utf-8"
  ) {
    return fs.writeFileSync(path, data, { encoding });
  }

  // 判断文件是否存在
  existsSync(path: string) {
    return fs.existsSync(path);
  }

  // 创建目录
  mkdirSync(path: string) {
    return fs.mkdirSync(path);
  }

  // 读取目录
  readdirSync(
    path: string,
    options: ObjectEncodingOptions & {
      withFileTypes: true;
      recursive?: boolean | undefined;
    },
    callback: (err: NodeJS.ErrnoException | null, files: Dirent[]) => void
  ) {
    return fs.readdir(path, options, callback);
  }

  // 删除文件
  unlinkSync(path: string) {
    return fs.unlinkSync(path);
  }

  // 删除目录
  rmdirSync(path: string) {
    return fs.rmdirSync(path);
  }

  // 重命名
  renameSync(oldPath: string, newPath: string) {
    return fs.renameSync(oldPath, newPath);
  }
}

export default new Fs();

/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import fs from "fs-extra";
import type { CopyOptionsSync, Dirent, MoveOptions, ObjectEncodingOptions, PathLike, RmOptions } from "fs-extra";
declare class Fs {
    fsExtra: typeof fs;
    readFileSync(path: string, encoding?: BufferEncoding): string;
    writeFileSync(path: string, data: string, encoding?: BufferEncoding): void;
    existsSync(path: string): boolean;
    copyFileSync(src: string, dest: string): void;
    mkdirSync(path: string): void;
    readdirSync(path: string, options: ObjectEncodingOptions & {
        withFileTypes: true;
        recursive?: boolean | undefined;
    }, callback: (err: NodeJS.ErrnoException | null, files: Dirent[]) => void): void;
    rmdirSync(path: string): void;
    renameSync(oldPath: string, newPath: string): void;
    rmSync(path: PathLike, options: RmOptions | undefined): void;
    copySync(src: string, dest: string, options?: CopyOptionsSync): void;
    moveSync(src: string, dest: string, options?: MoveOptions): void;
    removeSync(path: string): void;
    remove(path: string): Promise<void>;
}
declare const _default: Fs;
export default _default;

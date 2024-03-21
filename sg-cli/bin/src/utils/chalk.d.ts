type ChalkFnType = keyof Chalk;
declare class Chalk {
    constructor();
    success(text: string): string;
    error(text: string): string;
    warning(text: string): string;
    info(text: string): string;
    underline(text: string): string;
    bold(text: string): string;
    dim(text: string): string;
    log(text: string, type?: ChalkFnType): void;
    logWithTime(text: string, type?: ChalkFnType): void;
}
declare const _default: Chalk;
export default _default;

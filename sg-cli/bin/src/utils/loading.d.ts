import type { Options } from "ora";
declare class Loading {
    private spinner;
    constructor();
    start(textOrOptions: string | Options, customOptions?: Options): void;
    update(text: string): void;
    stop(): void;
    succeed(text?: string): void;
    fail(text?: string): void;
    warn(text?: string): void;
    info(text?: string): void;
}
declare const _default: Loading;
export default _default;

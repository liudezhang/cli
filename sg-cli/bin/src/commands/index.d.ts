interface ICommands {
    [key: string]: {
        description: string;
        options: {
            cmd: string;
            description: string;
        }[];
        actions: (...args: any[]) => void;
    };
}
declare const commands: ICommands;
export default commands;

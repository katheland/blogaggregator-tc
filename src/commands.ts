import {setUser} from "./config.js";

type CommandHandler = (cmdName: string, ...args: string[]) => void;

export type CommandsRegistry = Record<string, CommandHandler>;

export const handlerLogin: CommandHandler = (cmdName: string, ...args: string[]) => {
    if (args.length == 0) {
        throw new Error("Login needs a username argument");
    }
    setUser(args[0]);
    console.log(`Username set to ${args[0]}`);
}

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    registry[cmdName] = handler; 
}

export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    const handler = registry[cmdName];
    if (!handler) {
        throw new Error(`Unknown command: ${cmdName}`);
    }
    handler(cmdName, ...args);
}
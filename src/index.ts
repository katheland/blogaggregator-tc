import { exit } from "process";
import {readConfig} from "./config.js";
import {CommandsRegistry, registerCommand, runCommand, handlerLogin} from "./commands.js";

const registry: CommandsRegistry = {};

function main() {
    registerCommand(registry, "login", handlerLogin);
    let line = process.argv.slice(2);
    if (line.length == 0) {
        console.log("Not enough arguments provided.");
        exit(1);
    }
    let cmd = line[0];
    let args = line.slice(1);
    runCommand(registry, cmd, args[0])
    console.log(readConfig());
}

main();
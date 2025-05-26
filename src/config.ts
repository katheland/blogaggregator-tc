import os from "os";
import fs from "fs";

type Config = {
    dbUrl: string
    currentUserName: string
}

export function readConfig(): Config {
    const filepath = getConfigFilePath();
    const data = fs.readFileSync(filepath, 'utf8');
    const obj = JSON.parse(data);
    return validateConfig(obj);
}

export function setUser(user: string) {
    let c: Config = {
        dbUrl: "postgres://example",
        currentUserName: user
    };
    writeConfig(c);
}

function getConfigFilePath(): string {
    const home = os.homedir();
    return `${home}/.gatorconfig.json`;
}

function writeConfig(cfg: Config) {
    fs.writeFileSync(getConfigFilePath(), JSON.stringify(cfg));
}

function validateConfig(rawConfig: any): Config {
    let c: Config = {
        dbUrl: "",
        currentUserName: ""
    }
    if (rawConfig["dbUrl"]) {
        c.dbUrl = rawConfig["dbUrl"];
    }
    if (rawConfig["currentUserName"]) {
        c.currentUserName = rawConfig["currentUserName"];
    }
    return c;
}
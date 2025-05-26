import {readConfig, setUser} from "./config.js";

function main() {
    setUser("Kendrel");
    console.log(readConfig());
}

main();
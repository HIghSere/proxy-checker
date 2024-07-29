import fs from "fs";

export function UAGen() {
    const userAgents = fs.readFileSync("data/userAgents.txt", "utf-8");
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}
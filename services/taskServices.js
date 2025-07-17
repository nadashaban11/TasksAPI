const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "tasks.json");

async function readAllTasks() {
    const allTasks = await fs.readFile(filePath, "utf8");
    return JSON.parse(allTasks);
}

async function writeAllTasks(tasks) {
    await fs.writeFile(filePath, JSON.stringify(tasks));
}

module.exports = { readAllTasks , writeAllTasks};

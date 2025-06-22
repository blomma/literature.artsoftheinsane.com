import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

//this is the target path of my json files, copyed from `./public/data` by Vite
const publicDir = path.resolve(__dirname, "./docs/quotes/");

//recursively call jsonminify to json files in directory
const minifyJsonFiles = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            minifyJsonFiles(filePath);
        } else if (path.extname(file) === ".json") {
            const minifiedContent = JSON.stringify(
                JSON.parse(fs.readFileSync(filePath, "utf8")),
            );
            fs.writeFileSync(filePath, minifiedContent);
        }
    });
};

minifyJsonFiles(publicDir);

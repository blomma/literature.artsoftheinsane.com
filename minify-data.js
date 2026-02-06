import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "./docs/quotes/");

const minifyJsonFiles = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);

        if (fs.statSync(filePath).isDirectory()) {
            minifyJsonFiles(filePath);
        } else if (file.endsWith(".json")) {
            const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
            fs.writeFileSync(filePath, JSON.stringify(content));
        }
    });
};

minifyJsonFiles(publicDir);

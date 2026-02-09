import fs from "node:fs";
import path from "node:path";

const publicDir = "./docs/quotes/";

const minifyJsonFiles = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            minifyJsonFiles(filePath);
        } else if (file.endsWith(".json")) {
            const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
            fs.writeFileSync(filePath, JSON.stringify(content));
        }
    });
};

minifyJsonFiles(publicDir);

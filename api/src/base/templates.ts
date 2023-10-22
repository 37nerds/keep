import fs from "node:fs";
import path from "node:path";
import ejs from "ejs";

const loadTemplates = (directoryPath: string): { [key: string]: string } => {
    const templates: { [key: string]: string } = {};

    fs.readdirSync(directoryPath).forEach((file) => {
        const templatePath = path.join(directoryPath, file);
        const templateContent = fs.readFileSync(templatePath, "utf-8");
        templates[file] = templateContent;
    });

    return templates;
};

export const render = (template: string, params: object) => {
    return ejs.render(template, params);
};

const templates = loadTemplates(path.join(__dirname, "..", "..", "tmpl"));

export default templates;

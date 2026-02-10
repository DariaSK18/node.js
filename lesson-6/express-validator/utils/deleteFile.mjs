import fs from "fs";
import path from "path";
import { __dirname } from "../settings.mjs";

export function deleteFileFromDir(containsDirname, filename) {
    const filePath = path.join(__dirname, containsDirname, filename)
    // console.log('----checking file path', filePath, containsDirname, filename);
    if(fs.existsSync(filePath)) fs.unlinkSync(filePath)
}
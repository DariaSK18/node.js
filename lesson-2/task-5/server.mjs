import { createServer } from 'node:http';
import fs, { readFileSync } from 'node:fs';

const historyFilePath = 'history.json'
const settingsFilePath = 'settings.json'

const settingsData = readJSONData(settingsFilePath)

function writeJSONFile(filePath, content) {
    fs.writeFileSync(filePath, JSON.stringify(content), 'utf8')
}

function updateJSONFile(filePath, itemKey) {
    const data = readJSONData(filePath)
    if (itemKey in data) data[itemKey]++
    else data[itemKey] = 1
    writeJSONFile(filePath, data)
}

function readJSONData(filePath) {
    if (!fs.existsSync(filePath)) {
        return {}
    } else {
        const data = readFileSync(filePath, 'utf8')
        return JSON.parse(data)
    }
}

const server = createServer(async (req, res) => {
    const urlPath = req.url

    if (urlPath === settingsData.historyRoute) {
        const historyData = readJSONData(settingsData.historyFilePath)
        if (Object.keys(historyData).length === 0) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('File doesn\'t exist or history is empty!');
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(historyData));
        }
    }
    else {
        if (!fs.existsSync(historyFilePath)) writeJSONFile(historyFilePath, { [urlPath]: 1 })
        else updateJSONFile(historyFilePath, urlPath)
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Visited route: ${urlPath} \nTo check history visit ${settingsData.historyRoute}`);
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
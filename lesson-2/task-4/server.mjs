import { createServer } from 'node:http';
import { readFile } from "fs/promises";
import fs from 'node:fs';

async function readData(filePath) {
    const data = await readFile(filePath, 'utf8')
    return data
}

const server = createServer(async (req, res) => {
    const urlPath = req.url

    let fileName = urlPath === '/' ? 'index.html' : `${urlPath.slice(1)}.html`

    if (!fs.existsSync(fileName)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('File not found!')
    }
    const data = await readData(fileName)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);

});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});

import { createServer } from 'node:http';
import fs, { appendFileSync } from 'node:fs';

const filePath = 'nums.txt'

function isValidNum(val) {
    if (val && !isNaN(Number(val)) && val.trim() !== '') return val
}
function updateFile(filePath, content) {
    const data = {
        statusCode: null,
        msg: ''
    }
    if (fs.existsSync(filePath)) {
        appendFileSync(filePath, content + '\n', 'utf8')
        data.statusCode = 200
        data.msg = 'File updated!\n';
    }
    else {
        fs.writeFileSync(filePath, content + '\n', 'utf8')
        data.statusCode = 201
        data.msg = 'File created and saved!\n'
    }
    return data
}
function readData(filePath) {
    const data = fs.readFileSync(filePath, 'utf8').split('\n')
    const numsList = data.filter(num => num.trim() !== '').map(num => Number(num))
    return numsList
}
function findSum(nums) {
    return nums.reduce((prev, current) => prev + current, 0)
}
function findMult(nums) {
    return nums.reduce((prev, current) => prev * current, 1)
}

const server = createServer((req, res) => {

    const urlPath = req.url.slice(1).split('/')
    const urlAction = urlPath[0]
    const urlNum = urlPath[1]

    if (urlAction === 'save-num') {
        const num = isValidNum(urlNum)
        if (num) {
            const data = updateFile(filePath, num)
            // console.log('data', data);
            res.writeHead(data.statusCode, { 'Content-Type': 'text/plain' });
            res.end(data.msg);
        }
        else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid Number!\n');
        }

    }
    else if (urlAction === 'sum') {
        const data = readData(filePath)
        const sum = findSum(data)
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Sum = ${sum}!\n`);
    }
    else if (urlAction === 'mult') {
        const data = readData(filePath)
        const mult = findMult(data)
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Mult = ${mult}!\n`);
    }
    else if (urlAction === 'remove') {
        if (!fs.existsSync(filePath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File doesn\'t exist or has been removed already!\n');
            return
        }
        fs.unlinkSync(filePath)
        res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File was deleted successfully\n');
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Unknown route!\n');
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});

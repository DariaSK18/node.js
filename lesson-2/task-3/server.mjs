import { createServer } from 'node:http';

function findSum(nums) {
    return nums.reduce((prev, current) => prev + current, 0)
}
function findProduct(nums) {
    return nums.reduce((prev, current) => prev * current, 1)
}
function findDifference(nums) {
    return nums.reduce((prev, current) => prev - current)
}

const server = createServer((req, res) => {
    const urlPath = req.url.slice(1).split('/')
    const urlAction = urlPath[0]
    const urlNums = urlPath[1]

    if (!urlNums) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`No parameters were passed!\n`);
    }
    else {
        const numbers = urlNums.split('-').map(Number)
        // console.log(numbers);
        if (numbers.some(Number.isNaN)) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end(`Provide numbers only!\n`);
        }
        else {
            let result
            switch (urlAction) {
                case 'add':
                    result = findSum(numbers)
                    break;
                case 'subtract':
                    result = findDifference(numbers)
                    break;
                case 'mult':
                    result = findProduct(numbers)
                    break;

                default:
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    return res.end('Unknown route!\n');
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Result = ${result}!\n`);
        }
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});

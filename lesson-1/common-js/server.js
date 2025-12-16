const { createServer } = require("node:http");
const { getUrlParams, getPesonDetails } = require("./helper");

const server = createServer((req, res) => {
  const url = req.url;
  let param = getUrlParams(url);
  const personDetails = getPesonDetails(param);
  // console.log(personDetails);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(personDetails));
});

const PORT = 3000;
const HOST = "0.0.0.0";

server.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
  console.log(`http://${HOST}:${PORT}`);
});

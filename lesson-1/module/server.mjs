import { createServer } from "node:http";
import { getUrlParams, getPesonDetails } from "./helper.mjs";

const server = createServer((req, res) => {
  const url = req.url;
  let param = getUrlParams(url);
  const personDetails = getPesonDetails(param);
  // console.log(req.url !== '/favicon.ico');
  // console.log(personDetails);
  // console.log(res);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(personDetails));
});

const PORT = 3000;
const HOST = "0.0.0.0";

server.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
  console.log(`http://${HOST}:${PORT}`);
});

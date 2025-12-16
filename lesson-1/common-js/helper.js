const data = require("../data.json");

function getUrlParams(url) {
  return url.split("/")[1];
}

function getPesonDetails(position) {
  if (position === "favicon.ico") return null;
  if (position in data) return data[position];
  else return `Person not found. Existing positions: ${Object.keys(data)}`;
}

module.exports = {
  getUrlParams,
  getPesonDetails,
};

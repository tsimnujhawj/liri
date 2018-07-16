
const Twitter = require("twitter");

const Config = require("./config");

const T = new Twitter(Config);

console.log(T);


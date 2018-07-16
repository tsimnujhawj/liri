
const Twitter = require("twitter");

const twitConfig = require("./twit_config");

const T = new Twitter(twitConfig);

console.log(T);


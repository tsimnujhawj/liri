
require("dotenv").config();

const Twit = require("twit");

const keys = require("./keys");

const T = new Twit(keys.twit);

let tweet = {
    status: "Tweet from Node.js!"
}


T.post("statuses/update", tweet, tweeted)

function tweeted(error, tweet, response) {
    if (error) {
        console.log("ERROR: " + error)
    } else {
        console.log("It worked!");
    }
}
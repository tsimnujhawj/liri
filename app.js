
const Twit = require("twit");

const Config = require("./config");

const T = new Twit(Config);

let postText = {
    status: "This is a message sent from Node.js!"
}


T.post("statuses/update", tweet, tweeted)

function tweeted(error, tweet, response) {
    if (error) {
        console.log("ERROR: " + error)
    } else {
        console.log("It worked!");
    }
}
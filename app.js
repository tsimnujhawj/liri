
require("dotenv").config();

const Twitter = require("twitter");

const keys = require("./keys");

const T = new Twitter(keys.twitter);

let params = {
    screen_name: "bandanaCoder",
    count: 20
}

function getTweets() {
    T.get("statuses/user_timeline", params, gotTweets);
}

function gotTweets(error, data, response) {
    if (error) {
        console.log("ERROR: " + error);
    } else {
        let tweetLength = data.length;
        for (i = 0; i < tweetLength; i++) {
            console.log(JSON.stringify(data[i].text + " --- POSTED ON: " + data[i].created_at, null, 2))
        }
    }
}


module.exports = {
    mytweets: function() {
        getTweets();
    }
}
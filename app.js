#!/usr/bin/env node


require("dotenv").config();

const Twit = require("twit");

const Twitter = require("twitter");

const keys = require("./keys");

const TwitPost = new Twit(keys.twit);

const T = new Twitter(keys.twitter);

// let tweet = {
//     status: "Tweet from Node.js!"
// }


// let postTweet = T.post("statuses/update", tweet, tweeted)

// function tweeted(error, tweet, response) {
//     if (error) {
//         console.log("ERROR: " + error);
//     } else {
//         console.log("It worked!");
//     }
// }


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


// module.exports = function() {
//     const args = "Hello"
// }
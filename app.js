
require("dotenv").config();
const Twitter = require("twitter");
const keys = require("./keys");
const fs = require("fs");
const request = require("request");

let command = process.argv[2];
let argu = process.argv;
let userInput = [];

const T = new Twitter(keys.twitter);

function getTweets() {
    let params = {
        screen_name: "bandanaCoder",
        count: 20
    }
    T.get("statuses/user_timeline", params, gotTweets);
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
}

function movie() {
    console.log("movie")
    stringArgu();
    userInput = userInput.split(" ").join("+");
    if (!userInput) {
        userInput = "Mr. Nobody";
    };
    let queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (error) {
            console.log("ERROR: " + error);
        } else {
            let body = (JSON.parse(body));
            console.log(body);
            console.log(body.Title + ", " + body.Year);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Actors: " + body.Actors);
            console.log("Plot: " + body.Plot);
            let ratings = body.Ratings;
            for (i = 0; i < ratings.length; i++) {
                if (ratings[i].Source === "Internet Movie Database") {
                  console.log(ratings[i].Source + ": " + ratings[i].Value);
                } else if (ratings[i].Source === "Rotten Tomatoes") { 
                  console.log(ratings[i].Source + ": " + ratings[i].Value) 
                }
              };
        }
    })
}

function spotify() {
    console.log("spotify")
}

function random() {
    console.log("random")
}

function stringArgu() {
    for (i = 3; i < argu.length; i++) {
        userInput.push(argu[i]);
    };
    userInput = userInput.join(" ");
}

function consoleStart() {
    switch(command) {
        case "my-tweets":
          getTweets();
          break;
        case "movie-this":
          movie();
          break;
        case "spotify-this-song":
          spotify();
          break;
        case "do-what-it-says":
          random();
          break;
        };
      }

consoleStart();
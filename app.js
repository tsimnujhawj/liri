
require("dotenv").config();
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const keys = require("./keys");
const fs = require("fs");
const request = require("request");

const lineDivide = "\r\n"
let command = process.argv[2];
let argu = process.argv;
let userInput = [];

const T = new Twitter(keys.twitter);
const S = new Spotify(keys.spotify);

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
                fs.appendFile("log.txt", data[i].text + " --- POSTED ON: " + data[i].created_at + lineDivide, function (error) {
                    if (error) {
                        console.log("ERROR: " + error);
                    } else if (!error) {
                        console.log("Data appended to log.txt")
                    }
                })
            }
        }
    }
}

function movie() {
    stringArgu();
    userInput = userInput.split(" ").join("+");
    if (!userInput) {
        userInput = "Mr. Nobody";
    };
    let queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (error) {
            console.log("ERROR: " + error);
        } else if (!error) {
            var body = (JSON.parse(body));
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
              fs.appendFile("log.txt", body.Title + ", " + body.Year + ", " + body.Country + ", " + body.Actors + ", " + body.Plot + lineDivide, function (error) {
                if (error) {
                    console.log("ERROR: " + error);
                } else if (!error) {
                    console.log("Data appended to log.txt")
                }
            })
        }
    })
}

function spotify() {
    stringArgu();
    if (!userInput) {
        userInput = "The Sign Ace of Base";
    };
    S.search({ type: "track", query: userInput, limit: 1 }, function(error, data) {
        if (error) {
            console.log("ERROR: " + error);
        } else if (!error) {
            let artistName = data.tracks.items[0].artists[0].name;
            let songName = data.tracks.items[0].name;
            let songPreview = data.tracks.items[0].preview_url;
            let albumName = data.tracks.items[0].album.name;
            console.log("Artist: " + artistName);
            console.log("Song: " + songName)
            console.log("Album: " + albumName)
            console.log("Song Preview: " + songPreview)
            fs.appendFile("log.txt", artistName + ", " + songName + ", " + albumName + ", " + songPreview + lineDivide, function (error) {
                if (error) {
                    console.log("ERROR: " + error);
                } else if (!error) {
                    console.log("Data appended to log.txt")
                }
            })
            };
    })
}

function random() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log("ERROR: " + error);
        } else if (!error) {
            let fileArr = data.split(",");
            fileArr[1] = fileArr[1].split(" ");
            command = fileArr[0];
            userInput = fileArr[1];
            consoleStart();
        }
    })
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
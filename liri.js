require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

//concert-this

if (process.argv[2] === "concert-this") {
    var artist = process.argv.slice(3).join(" ");
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function (response) {
            console.log("----------------");
            console.log("Band In Town Results:");
            console.log("----------------");
            console.log("Name of Venue = " + response.data[0].venue.name);
            console.log("Venue Location = " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            var eventDate = response.data[0].datetime;
            eventDate = moment(eventDate).format("MM/DD/YYYY");
            console.log("Date of Event = " + eventDate);
        }
    )

}

//spotify-this-song

if (process.argv[2] === "spotify-this-song") {
    var query = process.argv.slice(3).join(" ");
    spotify.search({
        type: 'track',
        query: query,
        limit: "1"
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("----------------");
        console.log("Spotify Results:");
        console.log("----------------");
        console.log("Band = " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Name = " + data.tracks.items[0].name);
        console.log("Preview Link = " + data.tracks.items[0].preview_url);
        console.log("Album = " + data.tracks.items[0].album.name);
    });
}

//movie-this

if (process.argv[2] === "movie-this") {
    var movieName = process.argv.slice(3).join(" ");
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=150e9ba";

    axios.get(queryURL).then(
        function (response) {
            console.log("----------------");
            console.log("IMDB Results:");
            console.log("----------------");
            console.log("Movie Title = " + response.data.Title);
            console.log("Year Released = " + response.data.Year);
            console.log("IMDB Rating = " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating = " + response.data.Ratings[1].Value);
            console.log("Produced In = " + response.data.Country);
            console.log("Language = " + response.data.Language);
            console.log("Plot = " + response.data.Plot);
            console.log("Actors = " + response.data.Actors);
        }
    )
}

//do-what-it-says

if (process.argv[2] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            }
            data = data.split(",");
            process.argv[2] = data[0];
            process.argv[3] = data[1];

            //spotify-this-song

            if (process.argv[2] === "spotify-this-song") {
                var query = process.argv.slice(3).join(" ");
                spotify.search({
                    type: 'track',
                    query: query,
                    limit: "1"
                }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }

                    console.log("----------------");
                    console.log("Spotify Results:");
                    console.log("----------------");
                    console.log("Band = " + data.tracks.items[0].album.artists[0].name);
                    console.log("Song Name = " + data.tracks.items[0].name);
                    console.log("Preview Link = " + data.tracks.items[0].preview_url);
                    console.log("Album = " + data.tracks.items[0].album.name);
                });
            }

            //concert-this

            if (process.argv[2] === "concert-this") {
                var artist = process.argv.slice(3).join(" ");
                var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
                axios.get(queryURL).then(
                    function (response) {
                        console.log("----------------");
                        console.log("Band In Town Results:");
                        console.log("----------------");
                        console.log("Name of Venue = " + response.data[0].venue.name);
                        console.log("Venue Location = " + response.data[0].venue.city + ", " + response.data[0].venue.region);
                        var eventDate = response.data[0].datetime;
                        eventDate = moment(eventDate).format("MM/DD/YYYY");
                        console.log("Date of Event = " + eventDate);
                    }
                )

            }

            //movie-this
            if (process.argv[2] === "movie-this") {
                var movieName = process.argv.slice(3).join(" ");
                var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=150e9ba";

                axios.get(queryURL).then(
                    function (response) {
                        console.log("----------------");
                        console.log("IMDB Results:");
                        console.log("----------------");
                        console.log("Movie Title = " + response.data.Title);
                        console.log("Year Released = " + response.data.Year);
                        console.log("IMDB Rating = " + response.data.imdbRating);
                        console.log("Rotten Tomatoes Rating = " + response.data.Ratings[1].Value);
                        console.log("Produced In = " + response.data.Country);
                        console.log("Language = " + response.data.Language);
                        console.log("Plot = " + response.data.Plot);
                        console.log("Actors = " + response.data.Actors);
                    }
                )
            }

        }

    )
}
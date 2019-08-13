

require("dotenv").config();
keys = require("./key.js");
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');
// moment().format();

var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var nodeArgs = process.argv;




switch (command) {
    case 'concert-this':
        concertSearch();
        break;

    case 'spotify-this-song':
        songSearch();
        break;

    case 'movie-this':
        movieSearch();
        break;

    case 'do-what-it-says':
        liriDo();
        break;
}



function concertSearch() {
    var searchQuery = "";

    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            searchQuery = searchQuery + "+" + nodeArgs[i];
        } else {
            searchQuery += nodeArgs[i];


        }
    }

    var queryURL = "https://rest.bandsintown.com/artists/" + searchQuery + "/events?app_id=codingbootcamp";

    console.log(queryURL);

    axios.get(queryURL).then(
        function (response) {
            console.log('--------\n')
            console.log("Venue Name: " + response.data[0].venue.name);
            console.log("Location  Name: " + response.data[0].venue.city + ', ' + response.data[0].venue.region);
            console.log("Date of event: " + moment(response.data[0].datetime).format('MM/DD/YYYY'));

            console.log('\n--------')


        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}
function songSearch() {
    var searchQuery = "";

    if (!searchQuery) {
        searchQuery = "The+Sign+Ace+of+Base"
    }

    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            searchQuery = searchQuery + "+" + nodeArgs[i];
        } else {
            searchQuery += nodeArgs[i];


        }
    }

    var spotify = new Spotify(keys.spotify);

    spotify.search({
        type: 'track', query: searchQuery, limit: 5
    })
        .then(function (response) {
            console.log('--------\n')
            console.log('Artist Name: ' + response.tracks.items[0].artists[0].name);
            console.log('Song Name: ' + response.tracks.items[0].name);
            console.log('Preview: ' + response.tracks.items[0].preview_url);
            console.log('Album Name: ' + response.tracks.items[0].album.name);
            console.log('\n--------')
        })
        .catch(function (err) {
            console.log(err);
        });

}
function movieSearch() {
    var searchQuery = "";

    if (!searchQuery) {
        searchQuery = "Mr.+Nobody"
    }

    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            searchQuery = searchQuery + "+" + nodeArgs[i];
        } else {
            searchQuery += nodeArgs[i];


        }
    }

    var queryOMDB = 'http://www.omdbapi.com/?apikey=trilogy&t=' + searchQuery + '&type=movie'
    console.log(queryOMDB);


    axios.get(queryOMDB).then(
        function (response) {
            console.log('--------\n')
            console.log("Movie Name: " + response.data.Title);
            console.log("Movie Year: " + response.data.Year);
            console.log("IMBD Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country produced in: " + response.data.Country);
            console.log("Movie Language: " + response.data.Language);
            console.log("Movie Plot: " + response.data.Plot);
            console.log("Movie Actors: " + response.data.Actors);
            console.log('\n--------')


        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}
function liriDo() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);
    });

}

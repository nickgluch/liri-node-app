// search (parameter) spotify for songs
// search (parameter) bands in town for concerts
// search (parameter) omdb for movies
// 
// send requests for these searches through axios
// 
//



require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var nodeArgs = process.argv;

switch (action) {
    case "total":
        total();
        break;

    case "deposit":
        deposit();
        break;

    case "withdraw":
        withdraw();
        break;

    case "lotto":
        lotto();
        break;
}


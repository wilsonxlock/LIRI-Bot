
var twitterKeys = require("./keys.js")
var request = require("request")
var textFile = require("./random.txt")
twitterUrl = "https://api.twitter.com/1.1/statuses/home_timeline.json?oauth_consumer_key=" + twitterKeys.consumer_key +"&oauth_token=" + twitterKeys.access_token_key + "912436625996701696-RZE7gcFTqyxeDZxvvIE47piOwRDZHoM&oauth_signature_method=HMAC-SHA1&oauth_timestamp=&oauth_nonce=&oauth_version=1.0&oauth_signature="
spotifyUrl = "https://api.spotify.com/v1/search?type=track"
console.log(twitterKeys.consumer_key);
if (process.argv[2] == "my-tweets"){
request(twitterUrl, function(err, response){
  console.log(response.text)
  if (err){
      return console.log(err)
  }
})
}
// cant get it to return twitter body, i know its bad auth but i cant figure out how to generate sig. Works in postman but its generating everything for me. 
if (process.argv[2] == "spotify-this-song"){
request(spotifyUrl, function(err, response){
    var songName = process.argv[3]
    console.log(response)
    if (err){
        return console.log(err)
    }
  })
}
//cant get spotify authentication token even on postman. Not sure what im doing worng. 
if (process.argv[2] == "movie-this"){
    var movieName = []
    for ( i = 3; i < process.argv.length; i++){
      movieName.push(process.argv[i])
    }
    if (movieName == ""){
        movieName.push("Mr. Nobody")
    }
    movieName = movieName.join("+")
    var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

      request(movieUrl, function(err, response, body){
      if ( !err && response.statusCode === 200){
        console.log(JSON.parse(body).Title);
        console.log(JSON.parse(body).Year);
        console.log(JSON.parse(body).imdbRating);
        console.log(JSON.parse(body).Ratings[1].Value);
        console.log(JSON.parse(body).Country);
        console.log(JSON.parse(body).Language);
        console.log(JSON.parse(body).Plot);
        console.log(JSON.parse(body).Actors);
        console.log(textFile[1])
      }
      if (err){
          return console.log(err)
      }
    })
    
    
}
if(process.argv[2] == "do-what-it-says") {
    fs.readFile(textFile, "utf8", (err, data) => {
        if (err) {
          return console.log(err);
        }
        else{ console.log(data)}
    })
}
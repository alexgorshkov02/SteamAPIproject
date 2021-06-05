var apiKey = "7daf1ca7cbaf4dff8d122f5a6bcb4160";
var genre = "action";

// https://api.rawg.io/api/games?key=7daf1ca7cbaf4dff8d122f5a6bcb4160&genres=action

var getListOfGamesSpecificGenre = function (genre) {
  var apiUrl =
    "https://api.rawg.io/api/games?key=" + apiKey + "&genres=" + genre;

  // make a get request to url
  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      //   console.log(response);
      response
        .json()
        .then(function (data) {
          console.log(data);
          console.log("Games for 'action' genre: " + data.results[0].name);

          //hardcoded just for example
          var gameName = data.results[0].name;
          return gameName;
        })
        .then(function (gameName) {
          // https://www.cheapshark.com/api/1.0/deals?title=Grand%20Theft%20Auto%20V&onSale=1
          var apiUrl =
            "https://www.cheapshark.com/api/1.0/deals?title=" +
            gameName +
            "&onSale=1";
          console.log(apiUrl);
          // make a get request to url
          fetch(apiUrl).then(function (response) {
            // request was successful
            if (response.ok) {
              //   console.log(response);
              response.json().then(function (data) {
                //hardcoded just for example
                var game = data[0];
                //   var saleRatingGame =
                console.log("Game: ", game);
                var dealRating = game.dealRating;

                if (parseInt(dealRating) > 1) {
                  console.log("SHOW ON THE PAGE: ", data[0].title);
                }
              });
            } else {
              alert("Error: " + response.statusText);
            }
          });
        });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

// var getDealsforGame = function (gameName) {
//   var apiUrl = "https://www.cheapshark.com/api/1.0/games?title=" + gameName + "&limit=60&exact=1";
//   console.log(apiUrl);
//   // make a get request to url
//   fetch(apiUrl).then(function (response) {
//     // request was successful
//     if (response.ok) {
//       //   console.log(response);
//       response.json().then(function (data) {
//         console.log(data);
//         console.log(data.results);
//       });
//     } else {
//       alert("Error: " + response.statusText);
//     }
//   });
// };

// var gameExample =
getListOfGamesSpecificGenre(genre);
// console.log("gameExample: " + gameExample);
// getDealsforGame(gameExample);

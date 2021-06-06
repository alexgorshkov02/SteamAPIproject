var apiKey = "7daf1ca7cbaf4dff8d122f5a6bcb4160";
var genre = "action";

var gamesToShow = [];

var getListOfGamesSpecificGenre = function (genre) {
  // https://api.rawg.io/api/games?key=7daf1ca7cbaf4dff8d122f5a6bcb4160&genres=action&platforms=187

  //Playstation 5 hardcoded
  var selectedPlatform = 187;
  var apiUrl =
    "https://api.rawg.io/api/games?key=" +
    apiKey +
    "&genres=" +
    genre +
    "&platforms=" +
    selectedPlatform;

  // make a get request to url
  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      //   console.log(response);
      response
        .json()
        .then(function (data) {
          console.log(data);
          console.log("Games for 'action' genre & PS5: " + data.results[0].name);

          var gamesForSpecificGenre = [];

          for (var i = 0; i < data.results.length; i++) {
            gamesForSpecificGenre.push(data.results[i].name);
          }

          //hardcoded just for example
          return gamesForSpecificGenre;
        })
        .then(function (gamesNames) {
          // https://www.cheapshark.com/api/1.0/deals?title=Grand%20Theft%20Auto%20V&onSale=1&exact=1
          console.log("GAMES!!!!: ", gamesNames);
          for (var i = 0; i < gamesNames.length; i++) {
            var apiUrl =
              "https://www.cheapshark.com/api/1.0/deals?title=" +
              gamesNames[i] +
              "&onSale=1" +
              //   To get only exact names
              "&exact=1";
            console.log(apiUrl);
            // make a get request to url
            fetch(apiUrl).then(function (response) {
              // request was successful
              if (response.ok) {
                //   console.log(response);
                response.json().then(function (data) {
                  console.log("TEST!!!: ", data);
                  if (data) {
                    for (var i = 0; i < data.length; i++) {
                      var dealRating = data[i].dealRating;

                      if (parseInt(dealRating) > 3) {
                        //gamesToShow is global
                        gamesToShow.push(data[i].title);
                      }
                    }
                    // console.log("SHOW ON THE PAGE: ", gamesToShow);
                  }
                });
              } else {
                alert("Error: " + response.statusText);
              }

              //   return gamesToShow;
            });
          }
        });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

getListOfGamesSpecificGenre(genre);

//gamesToShow is global. TODO: Probably it will be better to use local like: var gamesToShowArray = getListOfGamesSpecificGenre(genre); and return it in the function
console.log("SHOW ON THE PAGE: ", gamesToShow);

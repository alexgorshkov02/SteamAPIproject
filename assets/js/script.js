var searchGamesBtn = document.querySelector("#search-games");
var selectedPlatformEl = document.querySelector("#selected-platform");
var selectedGameGenreEl = document.querySelector("#selected-game-genre");
var sectiontoShowGamesEl = document.querySelector("#game-list-to-show");

var apiKey = "7daf1ca7cbaf4dff8d122f5a6bcb4160";

var gamesToShow = [];

var searchGamesSpecificGenreAndPlatform = function () {
  var selectedGameGenre =
    selectedGameGenreEl.options[selectedGameGenreEl.selectedIndex].id;
  var selectedPlatform =
    selectedPlatformEl.options[selectedPlatformEl.selectedIndex].id;
  console.log(
    "selectedPlatform!!!!!!!!!!!!!!!!!!!!!!!!: " +
      selectedGameGenre +
      "; selectedPlatform!!!!!!!!!!!!!!!!!!!!!!!!: " +
      selectedPlatform
  );
  getListOfGamesSpecificGenreAndPlatform(selectedGameGenre, selectedPlatform);
};

function gamesToShowfunction(gamesToShow) {
  // for (var i = 0; i < gamesToShow.length; i++) {
  // console.log("GAMES_TO_SHOW: " + gamesToShow[i]);
  gameContainer = document.createElement("div");
  gameContainer.innerHTML = gamesToShow;
  sectiontoShowGamesEl.appendChild(gameContainer);
  // }
}

var getListOfGamesSpecificGenreAndPlatform = function (genre, platform) {
  // https://api.rawg.io/api/games?key=7daf1ca7cbaf4dff8d122f5a6bcb4160&genres=action&platforms=187

  var apiUrl =
    "https://api.rawg.io/api/games?key=" +
    apiKey +
    "&genres=" +
    genre +
    "&platforms=" +
    platform;

  console.log("apiUrl: " + apiUrl);

  // make a get request to url
  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      //   console.log(response);
      response
        .json()
        .then(function (data) {
          console.log("All data: ", data);
          console.log(
            "Games for the selected genre & platform: " + data.results[0].name
          );

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
// var gamesToShow = [];
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
                response
                  .json()
                  .then(function (data) {
                    console.log("TEST!!!: ", data);
                    if (data) {
                      for (var i = 0; i < data.length; i++) {
                        var dealRating = data[i].dealRating;
                        
                        if (parseInt(dealRating) > 3) {
                          // To avoid adding the same game again
                          if (!gamesToShow.includes(data[i].title)) {
                            //gamesToShow is global
                            gamesToShow.push(data[i].title);
                            gamesToShowfunction(data[i].title);
                          }
                        }
                      }
                      // console.log("SHOW ON THE PAGE: ", gamesToShow);
                    }
                    
                  });
                  // .then(function (data) {
                  //   console.log("DATA befor the function:", data);
                    
                  // });
              } else {
                alert("Error: " + response.statusText);
              }

              //   return gamesToShow;
            });
          }

// return gamesToShow;
        // }) .then(function (data) {
        // gamesToShowfunction()})
        });  
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

searchGamesBtn.addEventListener("click", searchGamesSpecificGenreAndPlatform);

// TODO: sectiontoShowGamesEl.addEventListener("click", functionTodisplay)
// getListOfGamesSpecificGenre(genre, selectedPlatform);

//gamesToShow is global. TODO: Probably it will be better to use local like: var gamesToShowArray = getListOfGamesSpecificGenre(genre); and return it in the function
// console.log("SHOW ON THE PAGE: ", gamesToShow);

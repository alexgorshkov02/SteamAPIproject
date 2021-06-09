var searchGamesBtn = document.querySelector("#search-games");
var selectedPlatformEl = document.querySelector("#selected-platform");
var selectedGameGenreEl = document.querySelector("#selected-game-genre");
var sectiontoShowGamesEl = document.querySelector("#game-list-to-show");
var gameDetails = document.querySelector("#game-details");


// How many games to search
totalGamesToShowOnPage = 10;

var gameInfoEl = document.getElementById("game-info")
var apiKey = "6a8b35e595b04b39a8276e71021fa526";


var gamesToShow = [];
var searchGamesSpecificGenreAndPlatform = function () {
  var selectedGameGenre =
    selectedGameGenreEl.options[selectedGameGenreEl.selectedIndex].id;
  var selectedPlatform =
    selectedPlatformEl.options[selectedPlatformEl.selectedIndex].id;

  // console.log(
  //   "selectedPlatform!!!!!!!!!!!!!!!!!!!!!!!!: " +
  //     selectedGameGenre +
  //     "; selectedPlatform!!!!!!!!!!!!!!!!!!!!!!!!: " +
  //     selectedPlatform
  // );

  // Initialize the variables for the first usage
  var gamesToShow = [];
  var page = 1;
  
  // clears game section after new search
  sectiontoShowGamesEl.innerHTML = "";
  gamesToShow = getGamesToShow(selectedGameGenre, selectedPlatform, page, gamesToShow).then(function (gamesToShow) {
//  if (gamesToShow.length < 10 ) {
//   console.log("NOT DONE");
//  } else {
// display all collected games 
 gamesToShowfunction(gamesToShow);
//  console.log("DONE");
//  }
  });
};

async function getGamesToShow(genre, platform, page, gamesToShow) {
  while (gamesToShow.length < totalGamesToShowOnPage) {
    
  var apiUrlRAWG =
    "https://api.rawg.io/api/games?key=" +
    apiKey +
    "&genres=" +
    genre +
    "&platforms=" +
    platform +
    "&page=" +
    page;

console.log("apiUrlRAWG: " + apiUrlRAWG);

    var games = await fetch(apiUrlRAWG).then(function(response) {
      if (response.ok) {

       response.json().then(function (data){

      if (data.next !== null ) {
        var gameNames = [];
      for (var i = 0; i < data.results.length; i++) {
        gameNames.push(data.results[i].name);
      }
    }
    return gameNames; 
      })
    }  else {
      // console.log("gamesToShow", gamesToShow);
 if (gamesToShow) {
   return gamesToShow; 
  } else {
    return ("No games found");
  }

    }
    });

    if ((games && games.length === 0) || (games === "No games found")) {
      gamesToShow = games;
      break;
    }
  
    if (games !== undefined ) {
 for (var i = 0; i < games.length; i++) {
    var apiUrlCheapShark =
    "https://www.cheapshark.com/api/1.0/deals?title=" +
    games[i] +
    "&onSale=1" +
    //   To get only exact names
    "&exact=1";
  console.log(apiUrlCheapShark);


    await fetch(apiUrlCheapShark).then(response => response.json()).then(function (data){
      if (data) {
        
          // Check if the game is on sale in any store
          for (var i = 0; i < data.length; i++) {
            if ((!gamesToShow.includes(data[i].title)) && (parseInt(data[i].dealRating)) > 3) {
              gamesToShow.push(data[i].title);
            }
        }}
      
      
        });

 }}
 page++;}
   

return gamesToShow;
}


function gamesToShowfunction(gamesToShow) {
  // console.log(typeof gamesToShow);
  if ((gamesToShow.length === 0) || (gamesToShow.constructor === String)) {
    gameContainer = document.createElement("div");
    gameContainer.innerHTML = "No games found";
    sectiontoShowGamesEl.appendChild(gameContainer);
  } else {
  for (var i = 0; i < gamesToShow.length; i++) {
  // console.log("GAMES_TO_SHOW: " + gamesToShow[i]);
  gameContainer = document.createElement("div");
  gameContainer.innerHTML = gamesToShow[i];
  sectiontoShowGamesEl.appendChild(gameContainer);
  }
}}


searchGamesBtn.addEventListener("click", searchGamesSpecificGenreAndPlatform);

sectiontoShowGamesEl.addEventListener("click", function (event) {
  // console.log(event.target.innerHTML);
  var gameName = event.target.innerHTML;
  var apiUrl =
    "https://www.cheapshark.com/api/1.0/deals?title=" +
    gameName +
    //   To get only exact names
    "&exact=1";
  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      response
        .json()
        //get store id's
        .then(function (data) {
          var storeObjArr = [];
          for (var i = 0; i < data.length; i++) {
            var storeObj = {
              storeId: data[i].storeID,
              storePrice: data[i].salePrice,
            };
            storeObjArr.push(storeObj);
          }

          console.log(storeObjArr);
          return storeObjArr;
        })
        .then(function (storeObjArr) {
          var apiStore = "https://www.cheapshark.com/api/1.0/stores";
          fetch(apiStore).then(function (response) {
            if (response.ok) {
              response.json().then(function (data) {
                console.log(data);
                var arr = [];
                // console.log("storeId: " + storeId);
                for (var i = 0; i < storeObjArr.length; i++) {
                  // console.log("data[i].storeID: " + data[i].storeID);
                  for (var j = 0; j < data.length; j++) {
                    if (storeObjArr[i].storeId === data[j].storeID) {
                      console.log("Store: " + data[j].storeName);

                      var obj = {
                        storeName: data[j].storeName,
                        storePrice: storeObjArr[i].storePrice,
                      };
                      console.log(obj);
                    }
                    if (obj !== undefined && !arr.includes(obj)) {
                      arr.push(obj);
                    }
                  }
                }

                // New Div for game clicked
                var gameNameDiv = document.createElement("div")
                gameNameDiv.textContent = gameName
               gameInfoEl.append(gameNameDiv)
                // New Div for storeName
                var gameStoreDiv = document.createElement("div")
                gameStoreDiv.textContent = data[0].storeName
                gameInfoEl.append(gameStoreDiv)

                var gamePriceDiv = document.createElement("a")
                gamePriceDiv.textContent = " Price: $" + storeObjArr[0].storePrice
                gameInfoEl.append(gamePriceDiv)

                
                // gameInfoEl.append(data[0].storeName)
                // gameInfoEl.append(" Price: $" +storeObjArr[0].storePrice)
                

                console.log(arr);
                // var storeId = data[0].storeName;
                // console.log(storeId);
              });
            }
          });
        });
    }
  });
});

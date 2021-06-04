var gameList = [];
var gameSale = [];
var apiUrl =
  "https://api.rawg.io/api/platforms?key=7daf1ca7cbaf4dff8d122f5a6bcb4160";

var apiUrl2 = "https://www.cheapshark.com/api/1.0/deals";

fetch(apiUrl)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

fetch(apiUrl2)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

function selectRating() {}

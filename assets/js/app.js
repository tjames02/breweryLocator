$(document).ready(function () {

    // var citySearch = [""];
    // var city = [""];

    breweryQuery = function (city) {
        var queryURL = "https://api.openbrewerydb.org/breweries?by_city="
        + city
        console.log(queryURL);
        
        
        
        $.ajax({
            method: "GET",
            url: queryURL,
        }).then(function(result) {
            console.log(result);
        });
    }
            // var city = result.city;

            // city.attr("src", url);
            // // for loop for more images
            // $(".gifs").append(gif);
            breweryQuery("Minneapolis");
        });
        // console.log(city);

        $("#city-input-btn").on("click", function(event) {
            event.preventDefault();
            // This line grabs the input from the textbox
            var city= $("#city-input").val().trim();
            console.log(city);
            // Adding movie from the textbox to our array
            // Calling renderButtons which handles the processing of our movie array
            displayBreweryInfo(city);
          });

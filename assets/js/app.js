$(document).ready(function () {
    $("button").on("click", function (e) {
        e.preventDefault();

        // Clearing out table each time Submit is hit
        $(".table > tbody:last").children().remove();
        $(".no-results").empty();

        // Call to openbrewerydb API
        var queryURL = "https://api.openbrewerydb.org/breweries?by_city=";
        $.ajax({
            url: queryURL + $(".search-index").val().trim(),
            method: "GET"
        }).then(function (response) {

            // Adding logic to return no results if there are no breweries in city searched for
            if (response.length === 0) {
                $(".no-results").text("No Results")
            } else {
                displayBreweryInfo(response);
            }

            // create a new row for each brewery object returned by api + append to table
            function displayBreweryInfo (response){

                for (var i =0; i<9; i++) {
            
                var brewery = response[i].name; 
                var street = response[i].street;
                var zip = response[i].postal_code; 
                var state = response[i].state;
                var address = street+", "+state+", "+zip; 
                var number = response[i].phone;
                var website = response[i].website_url; 
            
                var newRow = $("<tr>").append(
                $("<td>").text(brewery),
                $("<td>").text(address),
                $("<td>").text(number),
                $("<td>").html('<a href="'+website+'">'+website+'</a>'),
                
              );
            
              // Append the new row to the table
              $(".table > tbody").append(newRow);
            
            
                }
            }
        });
    });
});

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
            }

            // create a new row for each brewery object returned by api + append to table
            response.forEach(brewery => {
                var row = "<tr><td>" + brewery.city + "</td><td>" + brewery.state + "</td><td>" + brewery.name + "</td></tr>";

                $('.table').append(row);
            })
        });
    });
});

$(document).ready(function () {

    $("#map-row").hide();
    $( document ).tooltip();

   


    $("button").on("click", function (e) {
        e.preventDefault();
        $("#map-row").show();

        // Clearing out table each time Submit is hit
        $(".table > tbody:last").children().remove();
        $(".no-results").empty();

        // Call to openbrewerydb API
        var queryURL = "https://api.openbrewerydb.org/breweries?by_city=";
        $.ajax({
            url: queryURL + $(".search-index").val().trim(),
            method: "GET",
        }).then(function (response) {

            // Adding logic to return no results if there are no breweries in city searched for
            if (response.length === 0) {
                $(".no-results").text("No Results")
            } else {
                displayBreweryInfo(response);
            }

            // create a new row for each brewery object returned by api + append to table
            function displayBreweryInfo(response) {
                var cordinates = []

                var displayCount = response.length;

                if (displayCount > 10) {
                    displayCount = 10;
                }

                for (var i = 0; i < displayCount; i++) {

                    var brewery = response[i].name;
                    var street = response[i].street;
                    var zip = response[i].postal_code;
                    var state = response[i].state;
                    var address = street + ", " + state + ", " + zip;
                    var number = response[i].phone;
                    var website = response[i].website_url;
                    var lat = parseFloat(response[i].latitude);
                    // console.log('lat', lat);
                    var lng = parseFloat(response[i].longitude);
                    // console.log('lng', lng)

                    var newRow = $("<tr>").append(
                        $("<td>").text(brewery),
                        $("<td>").text(address),
                        $("<td>").text(number).text(function(i, text) {
                            text = text.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
                            return text;
                        }),
                        $("<td>").html('<a href="' + website + '">' + website + '</a>'),

                    );
                    // Append the new row to the table
                    $(".table > tbody").append(newRow);
                    if (!isNaN(lat)) {

                        cordinates.push({
                            lat: lat,
                            lng: lng,
                        })
                    }
                }
                initMap(cordinates);

            }
        });

        function initMap(cordinates) {
            console.log("initmar", cordinates);
            var location = cordinates[0];
            var map = new google.maps.Map(
                document.getElementById('map'), { zoom: 12, center: location });

            for (var i = 0; i < cordinates.length; i++) {

                var marker = new google.maps.Marker({ position: cordinates[i], map: map });
            }
            console.log(cordinates);
        }
    });
});

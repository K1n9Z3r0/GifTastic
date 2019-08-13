$(function () {
    populateButtons(movies, 'searchButton', '#buttonsArea');
    console.log("Page Loaded");
})

var movies = ["seven samurai", "buckaroo banzai", "shawn of the dead"];


function populateButtons(movies, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < movies.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', movies[i]);
        a.text(movies[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on('click', '.searchButton', function () {
    $('#searches').empty();
    var type = $(this).data('type');
    var searchInput = $("#search-input").val();


    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jOrlkLOfkfC3izVcg8F5VC4z65X1FYhL&q=" +
        type + "&limit=10&offset=0&rating=pg&lang=en"
    $.ajax({
        url: queryURL,
        method: 'GET',
    })

        .done(function (response) {
            console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $("<p>").text('Rating: ' + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');

                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);
            }
        })
})

$(document).on('click', '.searchImage', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addSearch').on('click', function () {
    var newSearch = $('input').eq(0).val();
    movies.push(newSearch);
    populateButtons(movies, 'searchButton', '#buttonsArea');
    return false;
})
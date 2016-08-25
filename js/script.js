
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    var nyApi = "cf1bbe89b28b48b0bf12e0001ed5afe1";

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var citySt = $('#city').val();
    var address = street + "," + citySt;
    var streetUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='
    + address + '';
    $body.append('<img class="bgimg" src="' + streetUrl + '">');

    $greeting.append('So you want to live at ' + address + "?");

    // YOUR CODE GOES HERE!
    var nyUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + citySt +
      "&sort=newest&api-key=" + nyApi + '';
    var nyArticles = $.getJSON(nyUrl, function(data){
      console.log(data);
      $($nytHeaderElem).text("New York Times Articles about: " + citySt);
      articles = data.response.docs;
      for(var i = 0; i < articles.length; i++){
        var article = articles[i];
        $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' +
        article.headline.main + '</a>' + '<p>' + article.snippet + '</p></li>');
      }
    });




    return false;
};

$('#form-container').submit(loadData);

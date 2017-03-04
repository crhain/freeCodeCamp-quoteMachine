
var quote = (function(){
  var module = {};
  var currentFormatedQuote = '';
  var currentQuote = '';
  var currentAuthor = '';

  function getQuote(){
    //Set up text of quote so it starts hidden and indicates it is loading
    $(".hidden").css("opacity", 0.0);
    $("#quote-text").html('Loading...');
    $("#quote-byline").html('');

    //Set up some variables for ajax request and the ajax request itself
    var url = 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=';

    var key='OcI6bew9zhmshl2EtCEA84x2sF4Lp1C53f5jsn5JSaSDsd7w2u';
    var request = $.ajax({
      headers: {
      'X-Mashape-Key': key,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: url,
      dataType: 'json'
    });

    request.done(function( jsonText ) {

      //Set fade effect for quote text
      $(".hidden").fadeTo(1000, 1);

      //set text
      $("#quote-text").html( '"' + jsonText.quote + '"');
      $("#quote-byline").html('- ' + jsonText.author);

      //set some variables to track current text
      currentQuote = '"' + jsonText.quote + '"';
      currentAuthor = jsonText.author;
      currentFormatedQuote = currentQuote + ' - ' + currentAuthor;
    });

    request.error(function( error ){
     var errorMessage = "Error! Cannot Load Resource.";
     alert(errorMessage);
    });

  }//end of getQuote()

  module.currentFormatedQuote = currentFormatedQuote;
  module.currentQuote = currentQuote;
  module.currentAuthor = currentAuthor;
  module.getQuote = getQuote;

  return module;

})();

//jquery main
$("document").ready(function(){
  quote.getQuote(); //get a quote when first initializing the page
//handle quote button clicks
  $("#btn-quote").on("click", function(){
    quote.getQuote();
  });

  //handle twitter button clicks
  $("#btn-twitter").on("click", function(){
    var twitterURL = "https://twitter.com/intent/tweet" + "?text=" + encodeURIComponent(quote.currentFormatedQuote) + "&hashtags=quote";
    window.open(twitterURL, "Share");
  });
  //handle tumblr button clicks
  $("#btn-tumblr").on("click", function(){
    var tumblrURL = "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags='#quote'&quote=" + quote.currentQuote + "&caption=" + quote.currentAuthor;
    window.open(tumblrURL, "Share");
  });
});

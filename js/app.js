function logResults(data){
  console.log(data);
}

var quote = (function(){
  var module = {};
  var currentFormatedQuote = '';
  var currentQuote = '';
  var currentAuthor = '';
  //get a new quote from forismatic.com
  function get(){
    //Set up text of quote so it starts hidden and indicates it is loading
    $(".hidden").css("opacity", 0.0);
    $("#quote-text").html('Loading...');
    $("#quote-byline").html('');
    var apiUrl = "http://api.forismatic.com/api/1.0/";
    var search = "?method=getQuote&key=457653&lang=en&format=jsonp";
    apiUrl += search
    //'http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&lang=en&format=jsonp'
    var request = $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'jsonp',
      jsonp: 'jsonp',
      cache: false
    });
    request.success(function( data ) {
      //Set fade effect for quote text
      $(".hidden").fadeTo(1000, 1);
      //set text
      $("#quote-text").html( '"' + data.quoteText + '"');
      $("#quote-byline").html('- ' + data.quoteAuthor);
      //set some variables to track current text
      currentQuote = '"' + data.quoteText + '"';
      currentAuthor = data.quoteAuthor;
      if(currentAuthor){
        currentFormatedQuote = currentQuote + ' - ' + currentAuthor;
      }
      else{
        currentFormatedQuote = currentQuote;
      }

      //console.log(data);
    });
    request.error(function( error ){
     var errorMessage = "Error! Cannot Load Resource.";
     console.log(errorMessage);
    });
  }
  module.currentFormatedQuote = currentFormatedQuote;
  module.currentQuote = currentQuote;
  module.currentAuthor = currentAuthor;
  module.get = get;
  return module;
})();

//jquery main
$("document").ready(function(){
  quote.get(); //get a quote when first initializing the page
//handle quote button clicks
  $("#btn-quote").on("click", function(){
    quote.get();
    //add logic to check size of quote and compare to size of quote window
    //if window is too small, then increase its size gradually by adding a height: 100% class
    //remove the height: 100% class if not too big?
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

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

      //set some variables to track current text
      currentQuote = '"' + data.quoteText + '"';
      currentAuthor = data.quoteAuthor;
      //currentQuote = '"' + "This is some really really long ass quote that is going to cause the container to scroll for sure so get ready for this shit.  But I guess it wasn't quite long enough.  So let's add even more! And we need to add yet more.  Amazing!  Let's just keep this quote going and going and going." + '"'
      //Set fade effect for quote text
      $(".hidden").fadeTo(1000, 1);
      if(currentAuthor){
        currentFormatedQuote = currentQuote + ' - ' + currentAuthor;
        $("#quote-byline").html("- " + currentAuthor);
      }
      else{
        currentFormatedQuote = currentQuote;
      }
      //set text
      $("#quote-text").html(currentQuote);
      //set quote-container scroll if quote text overflows
      toggleQuoteScroll();
      //console.log(data);
    });
    request.error(function( error ){
     var errorMessage = "Error! Cannot Load Resource.";
     console.log(errorMessage);
     $("#quote-text").html('Reload!');
     $("#quote-byline").html("");
    });
  }
  function toggleQuoteScroll(){
    var quoteContainer = $('#quote-container');
    var quoteContainerScrollHeight = quoteContainer.prop('scrollHeight');

    if(quoteContainerScrollHeight > quoteContainer.innerHeight()){
      quoteContainer.innerHeight(quoteContainerScrollHeight);
      //console.log(quoteContainer.attr('style'));
    }else if(quoteContainer.css('height')){
        //quoteContainer.removeAttr('height');
        quoteContainer.css('height', '');
        //console.log(quoteContainer.attr('style'));
    }
  }
  function getFormatedQuote(){
    return currentFormatedQuote;
  }
  function getQuote(){
    return currentQuote;
  }
  function getAuthor(){
    return currentAuthor;
  }
  module.get = get;
  module.getFormatedQuote = getFormatedQuote;
  module.getQuote = getQuote;
  module.getAuthor = getAuthor;
  module.toggleQuoteScroll = toggleQuoteScroll;
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
    var twitterURL = "https://twitter.com/intent/tweet" + "?text=" + encodeURIComponent(quote.getFormatedQuote()) + "&hashtags=quote";
    window.open(twitterURL, "Share");
  });
  //handle tumblr button clicks
  $("#btn-tumblr").on("click", function(){
    var tumblrURL = "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags='#quote'&quote=" + quote.getQuote() + "&caption=" + quote.getAuthor();
    window.open(tumblrURL, "Share");
  });
  //resset scroll window if window size resized
  $( window ).resize(function(e){
    safeAnimationFrame(quote.toggleQuoteScroll);
  });
});

function safeAnimationFrame(func){
  if(window.requestAnimationFrame){
    window.requestAnimationFrame(func);
  }
  else{
    window.setTimeout(func, 16.6);
  }
}

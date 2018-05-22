$(document).ready(function(){

// A FUNCTION TO FETCH THE JSON DATA FROM THE WIKIPEDIA API WITH CALLBACK FUNCTION 
function getData(domUpdateSearchBox, domUpdateBoxParagraph, domUpdateFromAPI) {

  userInput = $('.search-input-box').val();
  api = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";  
  callBack = "&callback=JSON_CALLBACK";
  
  $.ajax({    
        url: (api + userInput + callBack),
        type: 'GET',
        dataType: 'jsonp',
        success: function(a) {

          if(jQuery.isEmptyObject(a.query)) {

            $('.error-message').fadeIn();
            $(".my-info").css("position", "absolute");

          } else {

            $('.error-message').fadeOut();
          }
          
          pageJsonData = a['query']['pages'];

          keyArr = [];
          for (var key in pageJsonData) {
            keyArr.push(key);
          }
          domUpdateSearchBox();
          domUpdateBoxParagraph();
          domUpdateFromAPI();
          

          for(i=0; i < keyArr.length; i++) {

            searchResultBox = $( ".search-result-box" );
            page="https://en.wikipedia.org/?curid=";
            pageID = pageJsonData[keyArr[i]].pageid;
            $( ".search-result-box" ).eq( i ).attr("href", page + pageID);

          }
        },
        error: function() { console.log('Failed!'); },
    });    
};


// DETECTING ENTER KEY AS SUBMISSION OF A QUERY
$(".search-input-box").keyup(function(event) {
  if (event.keyCode === 13) {
      $(".search-submit-btn").click();
      $( ".search-result-box" ).remove();
  }
});

// INVOKING THE API CALL AND DOM MANUPULATIONS WITH THE CLICK EVENT
$('.search-submit-btn').click(function (){

  getData(domUpdateSearchBox, domUpdateBoxParagraph, domUpdateFromAPI);

  $('.container-search-and-btn').animate({top: '0em'}, 200);

  $( ".search-result-box" ).remove();

  $(".my-info").css("position", "relative");

});

// NEW WINDOW WITH THE RANDOM ARTICLE API
$('.get-random-page-btn').click(function (){
  
  window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');

});

// DOM MANUPULATION ACCORDING TO THE API CALL
function domUpdateFromAPI() {
  $('.search-result-title').append(pageJsonData[keyArr[0]].title);
  
            for(i=0; i < keyArr.length; i++) {
  
              searchResultDesc = $('.search-result-desc');
              searchResultDesc[i].append(pageJsonData[keyArr[i]].extract);

              
  
            }


}

// DOM MANUPULATION TO CREATE ELEMENTS AS THE QUERY
function domUpdateSearchBox () {

  for (i=0; i < keyArr.length; i++) {

  $( "<a class='search-result-box' href='#' target='_blank'></a>" ).appendTo( ".search-result-container" );
  
  }
 
}

// CREATING NEW HTML FOR TITLE AND DESCRIPTION OF THE QUERY
function domUpdateBoxParagraph () {
  $( "<p class='search-result-title'></p><p class='search-result-desc'></p>" ).appendTo( ".search-result-box");

}

});

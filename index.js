$(document).ready(function(){
function getData() {
  userInput = $('.search-input-box').val();
  console.log(userInput);
  var link = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=5&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + "what" + "&callback=JSON_CALLBACK";
  $.ajax({    
        url: link,
        type: 'GET',
        dataType: 'jsonp',
        success: function(a) {
          pageJsonData = a.query.pages;
          keyArr = [];
          for (var key in pageJsonData) {
            keyArr.push(key);
          }
         
        },
        error: function() { console.log('Failed!'); },
    });    
};

$('.search-submit-btn').click(function (){
  getData();
  domUpdateSearchBox();
  domUpdateBoxParagraph ();
  domUpdateFromAPI();
  userInput = $('.search-input-box').val();
  console.log(userInput);

  $(".search-submit-btn").attr("disabled", true);
});



getData();

function domUpdateFromAPI() {
  $('.search-result-title').append(pageJsonData[keyArr[0]].title);
  
            for(i=0; i < keyArr.length; i++) {
  
              var searchResultBox = $('.search-result-desc');
              searchResultBox[i].append(pageJsonData[keyArr[i]].extract);
  
            }


}


function domUpdateSearchBox () {

  for (i=0; i < keyArr.length; i++) { 
  $( "<div class='search-result-box'>" ).appendTo( ".search-result-container" );
  
  }
 
}

function domUpdateBoxParagraph () {
  $( "<p class='search-result-title'></p><p class='search-result-desc'></p>" ).appendTo( ".search-result-box");

}

});

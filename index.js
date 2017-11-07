// Here begins the javascript code 

// ES6 way to fetch api data and convert it to json 
function getData() {
  fetch("https://cors.io/?https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=4&prop=pageimages|" +
  "extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=what")
    .then(function (res) {
      res.json()
        .then(resp=>{
          pageData = resp.query.pages;
          var keyArr = [];
          for (var key in pageData) {
            keyArr.push(key);
            console.log(key);
            // var div= document.createElement("div"); 
            // div.setAttribute("class", "search-result-box");
            // document.querySelector(".search-result-container").appendChild(div);              
          }
          // console.log(pageData[keyArr[0]]);       
        })
    })
    .catch(function (err){
      console.log(err)
    })  
}

getData();

// HAVE TO FIND OUT ANOTHER SOLVE FOR THIS CORS IO ISSUE FFS
// THE API CORS IS NOT RESPONDING SOMETIMES AND IT's FUCKING ANNOYING

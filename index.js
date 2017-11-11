// Here begins the javascript code 

// ES6 way to fetch api data and convert it to json 
function getData() {
  fetch("https://crossorigin.me/https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=4&prop=pageimages|" +
  "extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=what")
    .then(function (res) {
      res.json()
        .then(resp=>{
          pageData = resp.query.pages;
          var keyArr = [];
          for (var key in pageData) {
            keyArr.push(key);
            console.log(key);
            domUpdateDiv();            
          }
          domUpdateP();
          console.log(pageData[keyArr[0]]);
                 
        })
    })
    .catch(function (err){
      console.log(err)
    })  
}

getData();



function domUpdateDiv() {
  var div= document.createElement("div"); 
  div.setAttribute("class", "search-result-box");
  document.querySelector(".search-result-container").appendChild(div);  
}

function domUpdateP () {
  var p1 = document.createElement("p");
  var p2 = document.createElement("p");
  p1.setAttribute("class", "search-result-title");
  p2.setAttribute("class", "search-result-desc");
  document.getElementsByClassName("search-result-box")[0].appendChild(p1);
  document.getElementsByClassName("search-result-box")[0].appendChild(p2);

}

// console.log(document.querySelector(".search-result-box").length);
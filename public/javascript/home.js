filterSelection("Popular")
function filterSelection(c) {
  document.getElementById("Cards-heading").innerHTML = c;
  var x, i, filtername;
  filtername = c;
  x = document.getElementsByClassName("filterDiv");
  if (c == "Popular")
    c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) 
        w3AddClass(x[i], "show");
  }
  var tag = document.createElement("i");
  document.getElementById("rename-filter").innerHTML = filtername;
  var element = document.getElementById("rename-filter");
  element.appendChild(tag);
  tag.className = "fa fa-caret-down dropbtn-style";
  // element.classList.add("fa-caret-down");
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("BtnContainer");
var btns = btnContainer.getElementsByClassName("selector-opt");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {

      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";

  });
}

function darkmode(){

  var body = document.getElementById("body");
  body.classList.toggle("dark-mode");

  var cardtxt = document.getElementsByClassName("card-read");
  for(i = 0; i < cardtxt.length; i++) {
    cardtxt[i].classList.toggle("dark-mode");
    cardtxt[i].classList.toggle("dark-bg");
  }

  var cardtitle = document.getElementsByClassName("card-title");
  var bookmark = document.getElementsByClassName("bookmark");
  for(i = 0; i < cardtitle.length; i++) {
    cardtitle[i].classList.toggle("dark-mode");
    bookmark[i].classList.toggle("dark-color");
  }

  var filteroptions = document.getElementsByClassName("selector-opt")
  for(i = 0; i < filteroptions.length; i++) {
    filteroptions[i].classList.toggle("dark-filter");
  }

  var authordark = document.getElementsByClassName("authors")
  for(i = 0; i < authordark.length; i++) {
    authordark[i].classList.toggle("dark-author-hover");
  }
}

function altimage()
{
  var tag = document.createElement("i");
  var element = document.getElementById("api_image");
  element.appendChild(tag);
  tag.className = "fas fa-user";
}
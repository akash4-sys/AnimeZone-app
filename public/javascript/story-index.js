function openNav() {
    document.getElementById("mySidenav").style.width = "272px";
    document.getElementById("main").style.marginLeft = "200px";
    document.getElementById("story-heading").style.marginLeft = "76px";
    document.getElementById("piechart-empty").style.width = "563px";
    document.getElementById("piechart-empty").style.marginRight = "20px";
    document.getElementById("table-ctn").style.paddingLeft = "132px";
    document.getElementById("Cards-heading").style.marginLeft = "87px";
    document.getElementById("selector").style.right = "32px";
    document.getElementById("piechart-ctn").style.marginRight = "256px";
    document.getElementById("addmore").style.right = "38px";

    var table = document.getElementsByClassName("tabhead");

    for(var i=0;i<4;i++){
        table[i].classList.add('sm');
    }

    var row = document.getElementsByClassName("colsm");
    row[0].classList.add('colsm-opennav');
    row[1].classList.add('colsm-opennav');
    
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "50px";
    document.getElementById("story-heading").style.marginLeft = "0px";
    document.getElementById("piechart-empty").style.width = "700px";
    document.getElementById("piechart-empty").style.marginRight = "102px";
    document.getElementById("table-ctn").style.paddingLeft = "50px";
    document.getElementById("Cards-heading").style.marginLeft = "5px";
    document.getElementById("selector").style.marginRight = "10px";
    document.getElementById("piechart-ctn").style.marginRight = "115px";
    document.getElementById("addmore").style.right = "50px";

    var table = document.getElementsByClassName("tabhead");

    for(var i=0;i<4;i++){
        table[i].classList.remove('sm');
    }

    var row = document.getElementsByClassName("colsm");
    row[0].classList.remove('colsm-opennav');
    row[1].classList.remove('colsm-opennav');

  }
  
filterSelection('All')
function filterSelection(c){
  document.getElementById('Cards-heading').innerHTML = c;
  var x, i, filtername;
  filtername = c;
  x = document.getElementsByClassName("filterDiv");
  if (c == "All")
  c=""
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
}

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

  var filteroptions = document.getElementsByClassName("selector-opt")
  for(i = 0; i < filteroptions.length; i++) {
    filteroptions[i].classList.toggle("dark-filter");
  }

}
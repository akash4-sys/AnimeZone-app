function openNav() {
    document.getElementById("mySidenav").style.width = "272px";
    document.getElementById("main").style.marginLeft = "200px";
    document.getElementById("story-heading").style.marginLeft = "65px";
    document.getElementById("piechart-empty").style.width = "625px";
    document.getElementById("table-ctn").style.paddingLeft = "118px";

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
    document.getElementById("table-ctn").style.paddingLeft = "50px";

    var table = document.getElementsByClassName("tabhead");

    for(var i=0;i<4;i++){
        table[i].classList.add('lm');
    }

    var row = document.getElementsByClassName("colsm");
    row[0].classList.add('colsm-closenav');
    row[1].classList.add('colsm-closenav');

  }

  function darkmode(){

    var body = document.getElementById("body");
    body.classList.toggle("dark-mode");
    
  }
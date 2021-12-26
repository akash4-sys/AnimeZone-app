function openNav() {
  document.getElementById("mySidenav").style.width = "272px";
  document.getElementById("main").style.marginLeft = "200px";
  document.getElementById("live-btn").style.left = "320px";
  document.getElementById("trending-heading").style.left = "320px";
  document.getElementById("trending-watch").style.left = "320px";
  document.getElementById("trending-subheading").style.left = "320px";
  document.getElementById("cards").style.marginLeft = "120px";
  document.getElementById("heading-ctn").style.marginLeft = "120px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "50px";
  document.getElementById("live-btn").style.left = "100px";
  document.getElementById("trending-heading").style.left = "100px";
  document.getElementById("trending-watch").style.left = "100px";
  document.getElementById("trending-subheading").style.left = "100px";
  document.getElementById("cards").style.marginLeft = "50px";
  document.getElementById("heading-ctn").style.marginLeft = "50px";
}
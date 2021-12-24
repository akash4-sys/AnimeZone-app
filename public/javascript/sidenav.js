function openNav() {
  document.getElementById("mySidenav").style.width = "272px";
  document.getElementById("main").style.marginLeft = "200px";
  document.getElementById("live-btn").style.left = "320px";
  document.getElementById("trending-heading").style.left = "320px";
  document.getElementById("trending-watch").style.left = "320px";
  document.getElementById("trending-subheading").style.left = "320px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("live-btn").style.left = "144px";
  document.getElementById("trending-heading").style.left = "144px";
  document.getElementById("trending-watch").style.left = "144px";
  document.getElementById("trending-subheading").style.left = "144px";
}
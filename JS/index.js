function myFunction() {
  var topnav = document.getElementById("myTopnav");
  if (topnav.className === "nav-bar") {
    topnav.className += " responsive";
  } else {
    topnav.className = "nav-bar";
  }
}

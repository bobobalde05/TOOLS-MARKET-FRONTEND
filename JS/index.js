function myFunction() {
  var topnav = document.getElementById("myTopnav");
  if (topnav.className === "nav-bar") {
    topnav.className += " responsive";
  } else {
    topnav.className = "nav-bar";
  }
}
function logOut() {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
}

const user = JSON.parse(localStorage.getItem("user"));
const signInTab = document.querySelector(".tab");
const logout = document.querySelector(".logout");
logout.style.display = "none";
if (user) {
  signInTab.style.display = "none";
  logout.style.display = "block";
}
logout.addEventListener("click", logOut);

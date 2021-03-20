const profile_img = document.querySelector(".profile-image");
//create an image tag
const image = document.createElement("img");
const user = JSON.parse(localStorage.getItem("user"));

//set src, alt and class attributes to img tag
image.setAttribute("src", user?.avatar);
image.setAttribute("alt", "profile picture");
image.setAttribute("class", "image");

//append img tag to profile_img div
profile_img.appendChild(image);

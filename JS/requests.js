const profile_img = document.querySelector(".profile-image");
//create an image tag
const image = document.createElement("img");
const names = document.createElement("span");
const feedback = document.querySelector(".feedback");
const userInfo = JSON.parse(localStorage.getItem("user"));
const container = document.querySelector(".toolss");

//set src, alt and class attributes to img tag
image.setAttribute("src", userInfo?.avatar);
image.setAttribute("alt", "profile picture");
image.setAttribute("class", "image");
names.setAttribute("class", "names");
names.textContent = `${userInfo?.firstName} ${userInfo?.lastName}`;

//append img tag to profile_img div
profile_img.appendChild(image);
profile_img.appendChild(names);
let id;
const url = "https://toolsmarket.herokuapp.com/api/v1/tools";
const borrowTool = async () => {
  const url = `${url}/update/${id}`;
  await fetch(url, {
    method: "PUT",
  })
    .then((res) => res.json())
    .then((body) => {
      if (body.message === "Borrow request sent") {
        feedback.innerHTML = "Borrow request sent";
        setTimeout(() => {
          feedback.innerHTML = "";
          location.reload();
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchTools = async () => {
  await fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((body) => {
      let allTools = "";
      body.tools.forEach(({ tool, avatar, rent, _id }) => {
        id = _id;
        allTools += `
            <tr>
            <td>${tool}</td>
            <td>&#163;${rent}</td>
            <td><img src=${avatar} class="image"></td>
          <td class="borrow-button"><button style="cursor:pointer" onclick="borrowTool()">Borrow</button><td>
           
          </tr>`;
      });

      container.innerHTML = allTools;
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};
fetchTools();
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

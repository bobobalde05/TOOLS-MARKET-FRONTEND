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
let approvalStatus;
const url = "http://localhost:5000/api/v1/tools";

const pendingTools = async () => {
  await fetch(`${url}/pending`, {
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
            <td>&#163; ${rent}</td>
            <td><img src=${avatar} class="image"></td>
            <td class="approve-button">
           <select class="approval" onchange="approval(this.value)">
           <option value="" disabled selected>Select an option</option>
           <option value="approved">Approve</option>
           <option value="rejected">Reject</option>
           </select>
           </td>
          </tr>`;
      });

      container.innerHTML = allTools;
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};
pendingTools();
const approval = async (approval) => {
  await fetch(`${url}/approve/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ approval }),
  })
    .then((res) => res.json())
    .then((body) => {
      console.log("body", body);
    })
    .catch((error) => {
      console.log(error);
    });
};

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

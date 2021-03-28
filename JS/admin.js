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

const url = "https://toolsmarket.herokuapp.com/api/v1/tools";

//function to make request to get pending tools
const pendingTools = async () => {
  await fetch(`${url}/pending`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((tool) => {
      let allTools = "";
      //loop over the tools and create a row with the tool information
      tool.tools.forEach(({ tool, avatar, rent, _id }) => {
        id = _id;

        allTools += `
            <tr>
            <td>${tool}</td>
            <td>&#163;${rent}</td>
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
      //insert the rows into its container
      container.innerHTML = allTools;
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};
//call the pending tools function
pendingTools();

// function that triggers request for tool approval
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
      feedback.innerHTML = "Tool approved";
      setTimeout(() => {
        location.reload();
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
    });
};

//function to log out
const logOut = () => {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
};

const user = JSON.parse(localStorage.getItem("user")); //Get user info from local storage
const signInTab = document.querySelector(".tab");
const logout = document.querySelector(".logout");
logout.style.display = "none";

//dynamically display signin or logout tab based on the login status
if (user) {
  signInTab.style.display = "none";
  logout.style.display = "block";
}

//trigger logout
logout.addEventListener("click", logOut);

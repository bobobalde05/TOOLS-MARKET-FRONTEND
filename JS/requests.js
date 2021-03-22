const profile_img = document.querySelector(".profile-image");
//create an image tag
const image = document.createElement("img");
const names = document.createElement("span");
const feedback = document.querySelector(".feedback");
const user = JSON.parse(localStorage.getItem("user"));

//set src, alt and class attributes to img tag
image.setAttribute("src", user?.avatar);
image.setAttribute("alt", "profile picture");
image.setAttribute("class", "image");
names.setAttribute("class", "names");
names.textContent = `${user?.firstName} ${user?.lastName}`;

//append img tag to profile_img div
profile_img.appendChild(image);
profile_img.appendChild(names);
let id;

const borrowTool = async () => {
  const url = `https://toolsmarket.herokuapp.com/api/v1/tools/${id}`;
  await fetch(
    url,

    {
      method: "PUT",
    }
  )
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
      console.log("ERROR", err);
    });
};

const fetchTools = async () => {
  const url = "https://toolsmarket.herokuapp.com/api/v1/tools";
  await fetch(
    url,

    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((body) => {
      let allTools = "";
      body.tools.forEach(({ tool, avatar, rent, _id }) => {
        id = _id;
        allTools += `
            <tr>
            <td>${tool}</td>
            <td>${rent}</td>
            <td><img src=${avatar} class="image"></td>
            <td><button onclick="borrowTool()">Borrow</button><td>
          </tr>`;
      });
      const container = document.querySelector(".toolss");

      container.innerHTML = allTools;
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

fetchTools();

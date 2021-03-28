const usersContainer = document.querySelector(".users");
const feedback_container = document.querySelector(".feedback");
const url = "https://toolsmarket.herokuapp.com/api/v1/users";
let id;
let update;

//function to make request to update user status
const updateStatus = async () => {
  await fetch(`${url}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: update }),
  })
    .then((res) => res.json())
    .then((body) => {
      feedback_container.innerHTML = "user status updated";
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllUsers = async () => {
  await fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((body) => {
      let allUsers = "";
      body.users.forEach(({ firstName, lastName, email, status, _id }) => {
        id = _id;
        if (status === "active") {
          update = "suspended";
        } else {
          update = "active";
        }
        allUsers += `
                <tr>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${email}</td>
                <td>${status}
                <td style="background:white">
              ${
                status === "active"
                  ? `<button class="suspend" onclick="updateStatus(id)">Suspend user</button>`
                  : `<button class="reactivate" onclick="updateStatus(id)">Reactivate</button>`
              }
               </td>
              </tr>`;
      });

      //inject user rows into users table
      usersContainer.innerHTML = allUsers;

      setTimeout(() => {
        location.reload();
      }, 3000);
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};
// call the function to fetch all users
getAllUsers();

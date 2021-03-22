const addTool = async (e) => {
  e.preventDefault();
  // get all user input values
  const tool = document.getElementById("tool").value;
  const phone = document.getElementById("phone").value;
  const avatar = document.getElementById("avatar").files[0];
  const rent = document.getElementById("rent").value;
  const feedbackContainer = document.querySelector(".feedback_container");
  feedbackContainer.innerHTML = "";
  // sign up API-endpoint url
  //   https://toolsmarket.herokuapp.com
  const url = "http://localhost:5000/api/v1/tools/add";

  // User input data object
  const formData = {
    tool,
    rent,
    avatar,
    phone,
  };

  //loop over the the object and convert the entire object to form data
  const form = new FormData();
  for (var key in formData) {
    form.append(key, formData[key]);
  }

  // Make a post request to sign up endpoint
  await fetch(
    url,

    {
      method: "POST",
      body: form,
    }
  )
    .then((res) => res.json())
    .then((body) => {
      console.log("body", body);
      if (body.message === "success") {
        // store user data in browser local storage
        feedbackContainer.classList.add("message-success");
        feedbackContainer.innerHTML = `tool added successfully`;
        setTimeout(() => {
          feedbackContainer.classList.remove("message-success");
          feedbackContainer.innerHTML = "";
        }, 3000);
      }
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

const sendbtn = document.querySelector(".submit");

// bind click event to submit button
sendbtn.addEventListener("click", addTool);

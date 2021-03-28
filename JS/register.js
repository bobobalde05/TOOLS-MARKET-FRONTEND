// Get sign up button
const signupbtn = document.getElementById("submit");

const signUp = async (e) => {
  signupbtn.innerHTML = "Loading...";
  e.preventDefault();
  // get all user input values
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const avatar = document.getElementById("file").files[0];
  const feedbackContainer = document.querySelector(".feedback_container");
  feedbackContainer.innerHTML = "";
  console.log("object", avatar);
  // sign up API-endpoint url
  const url = "https://toolsmarket.herokuapp.com/api/v1/users/register";

  // User input data object
  const formData = {
    firstName,
    lastName,
    avatar,
    phone,
    email,
    password,
  };
  for (var key in formData) {
    if (formData[key] === "") {
      feedbackContainer.classList.remove("message-success");
      feedbackContainer.classList.add("message-error");
      signupbtn.innerHTML = "Sign Up";
      return (feedbackContainer.innerHTML = "Please fill all fields");
    }
  }
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
      // check for success status
      if (body?.status === 409) {
        feedbackContainer.innerHTML = "user already exist";
        feedbackContainer.classList.add("message-error");
        feedbackContainer.classList.remove("message-success");
      }

      if (body.message === "success") {
        // store user data in browser local storage
        localStorage.setItem("user", JSON.stringify(body.newUser));

        feedbackContainer.innerHTML = `welcome ${firstName}, account created`;
        feedbackContainer.classList.remove("message-error");
        feedbackContainer.classList.add("message-success");
        setTimeout(() => {
          window.location.href = "requests.html";
        }, 2000);
      }
    })

    .catch((err) => {
      console.log("ERROR", err);
    });
};

// bind click event to sign up button
signupbtn.addEventListener("click", signUp);

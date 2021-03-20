const signUp = async (e) => {
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
  //   https://toolsmarket.herokuapp.com
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

        // redirect user to dashboard
        // if (body.data.newUser.isAdmin) {
        //   setTimeout(() => {
        //     window.location.href = "admin.html";
        //   }, 2000);
        //   // hideSpinner(e);
        // }
        // setTimeout(() => {
        //   window.location.href = "user.html";
        // }, 1000);
      }
      //   else {
      //     feedbackContainer.innerHTML = displayFeedback(body);
      //     feedbackContainer.classList.add("feedback-message-error");
      //     body.error.forEach(element => {
      //       Object.keys(formData).forEach(key => {
      //         if (element.key === key) {
      //           document.querySelector(`.${element.key}`).style.border =
      //             "0.7px solid #dc3545";
      //           document.querySelector(
      //             `.${element.key}`
      //           ).nextElementSibling.innerHTML = element.Rule;
      //         }
      //       });
      //     });
      //   }
    })

    .catch((err) => {
      console.log("ERROR", err);
    });
};

// Get sign up button
const signupbtn = document.getElementById("submit");

// bind click event to sign up button
signupbtn.addEventListener("click", signUp);

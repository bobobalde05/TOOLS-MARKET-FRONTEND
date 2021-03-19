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
  const url = "http://localhost:5000/api/v1/users/register";

  // User input data object
  const formData = {
    firstName,
    lastName,
    avatar,
    phone,
    email,
    password,
  };

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

      if (body.status === 200) {
        // store user data in browser local storage
        // const userData = JSON.stringify({
        //   id: body.data.newUser.id,
        //   username: body.data.newUser.lastName,
        //   token: body.data.token
        // });
        console.log("body", body);
        localStorage.setItem("user", userData);

        feedbackContainer.innerHTML = "welcome";
        feedbackContainer.classList.remove("feedback-message-error");
        feedbackContainer.classList.add("feedback-message-success");
        // window.scrollTo(0, 0);

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

    .catch((err) => err);
};

// Get sign up button
const signupbtn = document.getElementById("submit");

// bind click event to sign up button
signupbtn.addEventListener("click", signUp);

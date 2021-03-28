const signIn = (e) => {
  const feedbackContainer = document.querySelector(".login-message");
  feedbackContainer.innerHTML = "";
  e.preventDefault();
  // get form data
  const userEmail = document.getElementById("email").value;
  const userPassword = document.getElementById("password").value;

  const url = "https://toolsmarket.herokuapp.com/api/v1/users/login";

  const formData = {
    email: userEmail,
    password: userPassword,
  };
  // make post request to sign in route
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((body) => {
      // check for success status
      console.log("body", body);
      if (body?.status === 200) {
        // store user data in browser local storage
        localStorage.setItem("user", JSON.stringify(body?.user));

        feedbackContainer.innerHTML = `Welcome ${body?.user.firstName}`;
        feedbackContainer.classList.remove("message-error");
        feedbackContainer.classList.add("message-success");

        // redirect user to dashboard after 2 seconds
        if (body.user.userType === "admin") {
          setTimeout(() => {
            window.location.href = "admin.html";
          }, 2000);
        } else {
          setTimeout(() => {
            window.location.href = "requests.html";
          }, 2000);
          window.scrollTo(0, 0);
        }
      } else if (body?.status === 404 || body?.status === 400) {
        feedbackContainer.innerHTML = "invalid email or password";
        feedbackContainer.classList.add("message-error");
      }
    })
    .catch((err) => err);
};

const signInBtn = document.getElementById("login-btn");

// bind click event to sign in button
signInBtn.addEventListener("click", signIn);

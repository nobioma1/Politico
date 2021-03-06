async function loginUser(event) {
  event.preventDefault();

  const userData = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };
  
  await fetch(`${HOST}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.status !== 200) {
        document.getElementById("err_output").innerText = data.error;
        errorClass();
      } else {
        console.log(data);
        //storing current user details
        const current = data.data[0];
        // setting cookie to store user information
        const date = new Date();
        date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `poliJwtNmsStusUsr=${current.token}%${
          current.user.firstname
        } ${current.user.lastname}%${current.user.isAdmin}%${
          current.user.user_id
        }%${current.user.passporturl
        }%${expires}%path=/`;
        // Redirects User depending in role
        redirect()
      }
    })
    .catch(error => {
      document.getElementById("err_output").innerText = "Error Logging in";
      errorClass();
    });
}

document.getElementById('loginForm').addEventListener('submit', loginUser);

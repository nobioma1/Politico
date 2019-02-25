async function loginUser(event) {
  event.preventDefault();

  const userData = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };
  
  await fetch("https://politicho-ch3.herokuapp.com/api/v1/auth/login", {
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
        }%${expires}%path=/Politico`;
        // Redirects User depending in role
        if (current.user.isAdmin === true) {
          window.location.replace('/Politico/pages/admin.html');
        } else {
          window.location.replace('/Politico/pages/user.html');
        }
      }
    })
    .catch(error => {
      document.getElementById("err_output").innerText = "Error Logging in";
      errorClass();
    });
}

function redirect() {
  const ca = document.cookie.split('%');
  if (ca[0] !== '') {
    const status = ca[2];
    if (status === true) {
      window.location.replace('/Politico/pages/admin.html');
    } else {
      window.location.replace('/Politico/pages/user.html');
    }
  }
}

document.getElementById('loginForm').addEventListener('submit', loginUser);

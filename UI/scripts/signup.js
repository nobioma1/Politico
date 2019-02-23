async function addNewUser(event) {
  event.preventDefault();

  const newUserData = {
    firstName: document.getElementById('fname').value,
    lastName: document.getElementById('lname').value,
    email: document.getElementById('user_email').value,
    password: document.getElementById('password').value,
    phoneNumber: document.getElementById('phone_number').value,
    passportURL: document.getElementById('passport_image').value,
  };

  await fetch('https://politicho-ch3.herokuapp.com/api/v1/auth/signup', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUserData)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.status !== 201) {
        document.getElementById("err_output").innerText = data.error;
        errorClass();
      } else {
        document.getElementById("display").innerHTML = `
        <div class="form-header">
          <h1>Welcome</h1>
          <hr>
        </div>
        <p>Account Created, Click <a href="/index.html">Login</a></p>`;
      }
    })
    .catch(error => {
      document.getElementById("err_output").innerText =
        "Error Creating Account, Try Again";
      errorClass();
    });
}

function redirect() {
  const ca = document.cookie.split('%');
  if (ca[0] !== '') {
    const status = ca[2];
    if (status === true) {
      window.location = 'Politico/pages/admin.html';
    } else {
      window.location = 'Politico/pages/user.html';
    }
  }
}

document.getElementById('newUser').addEventListener('submit', addNewUser);

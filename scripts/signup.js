async function addNewUser(event) {
  event.preventDefault();

  let userData = new FormData();
  const avatarFile = document.querySelector("input[type='file']");

  userData.append('firstName', document.getElementById('fname').value);
  userData.append('lastName', document.getElementById('lname').value);
  userData.append('email', document.getElementById('user_email').value);
  userData.append('password', document.getElementById('password').value);
  userData.append('phoneNumber', document.getElementById('phone_number').value);
  userData.append('passportURL', avatarFile.files[0]);

  await fetch(`${HOST}/api/v1/auth/signup`, {
    method: 'POST',
    body: userData
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
        <p>Account Created, Click <a href="Politico/index.html">Login</a></p>`;
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
      window.location = '/pages/admin.html';
    } else {
      window.location = '/pages/user.html';
    }
  }
}

document.getElementById('newUser').addEventListener('submit', addNewUser);

// 'nav' sidebar on dashboard
const navDisplay = () => {
  const element = document.getElementById('nav');

  if (element.style.display === 'block') {
    element.style.display = 'none';
  } else {
    element.style.display = 'block';
  }
};

document.getElementById('nav-btn').addEventListener('click', navDisplay);


// Modal
const modal = (id) => {
  const modalDisplay = document.getElementById(id).style;

  if (modalDisplay.display === 'block') {
    modalDisplay.display = 'none';
  } else {
    modalDisplay.display = 'block';
  }
};

function getCookie() {
  const ca = document.cookie.split('%');
  if (ca[0] !== '') {
    const storedData = {
      token: ca[0].split('=')[1],
      name: ca[1],
      status: ca[2],
      x: ca[3],
      avatar: !!ca[4] ? ca[4] : '../images/no-avatar.png',
    };
    return storedData;
  }
  document.location.replace('/Politico');
}

const user = getCookie();
document.getElementById("currentUser").innerText += ` ${user.name}`;
document.getElementById("avatar").src = user.avatar;


function logout() {
  document.cookie = 'poliJwtNmsStusUsr=; expires=Mon, 01 Jan 1900 00:00:00 UTC; path=/Politico;';
  getCookie();
}

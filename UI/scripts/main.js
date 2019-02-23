const HOST = document.location.host === '127.0.0.1:8080' ? 'http://localhost:3000' : 'https://politicho-ch3.herokuapp.com';

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

function getCookie(cookieName) {
  const name = `${cookieName}=`;
  const ca = document.cookie.split('%');
  if (ca[0] !== '') {
    const storedData = {
      token: ca[0].split('=')[1],
      name: ca[1],
      status: ca[2],
      x: ca[3],
    };
    return storedData;
  }
  document.location = '/';
}

const user = getCookie('poliJwtNmsStusUsr');

function logout() {
  document.cookie = 'poliJwtNmsStusUsr=; expires=Mon, 01 Jan 1900 00:00:00 UTC; path=/;';
  document.location.href = '/';
}

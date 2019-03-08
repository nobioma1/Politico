// API HOST
const HOST = document.location.host === '127.0.0.1:8080' ? 'http://localhost:3000' : 'https://politicho-ch3.herokuapp.com';
// const HOST = "https://politicho-ch3.herokuapp.com";

function redirect() {
  const ca = document.cookie.split('%');
  if (!!ca[0]) {
    const status = ca[2];
    if (status == 'true') {
      window.location.replace('/Politico/pages/admin.html');
    } else {
      window.location.replace('/Politico/pages/user.html');
    }
  }
}

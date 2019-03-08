const card = document.getElementById('party');

fetch(`${HOST}/api/v1/parties`, {
  headers: {'x-access-token': user.token },
})
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    const parties = data.data;
    console.log(parties);
    if (parties.length !== 0) {
      parties.forEach((party) => {
        card.innerHTML += `
            <div class="column">
              <div class="square-card">
                <img src="${!!party.logourl ? party.logourl : '../images/no-image.jpg' }" alt="party logo">
                <div class="sqaure-card-container">
                 <h4><b>${party.name}</b></h4>
                 <p>${party.hqaddress}</p>
                </div>
              </div>
            </div>`;
      });
    } else {
      card.innerHTML = '&nbsp; <br> <em>No Political Party to view<em>';
    }
  })
  .catch((error) => {
    console.log(error);
  });

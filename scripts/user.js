const card = document.getElementById('office');
document.getElementById('currentUser').innerText += ` ${user.name}`;

fetch(`${HOST}/api/v1/offices`, {
  headers: { 'x-access-token': user.token },
})
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    const offices = data.data;
    console.log(offices);
    if (offices.length !== 0) {
      offices.forEach((office) => {
        card.innerHTML += `
            <a href="#" onclick="modal('particular_office'); officeCandidates(${office.office_id})">
              <div class="md-card">
                <div class="sqaure-card-container">
                  <h4><b>${office.name}</b></h4 >
                    <p>${office.type}</p>
                </div>
              </div>
            </a>`;
      });
    } else {
      card.innerHTML = '&nbsp; <br> <em>No Office Open for election <em>';
    }
  })
  .catch((error) => {
    console.log(error);
  });

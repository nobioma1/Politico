const card = document.getElementById('office');
const cardResult = document.getElementById('resultRow')

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
            <a href="#" onclick="modal('result'); getResult(${office.office_id})">
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

async function getResult(officeId) {
  const candidateArray = [];
  await fetch(`${HOST}/api/v1/offices/${officeId}/candidate`, {
    headers: { 'x-access-token': user.token },
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      const particularOffices = data.data;
      if (particularOffices.length !== 0) {
        particularOffices.forEach((item) => {
          candidateArray.push(item);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(candidateArray);

  await fetch(`${HOST}/api/v1/offices/${officeId}/result`, {
    headers: { 'x-access-token': user.token },
  })
    .then(response => response.json())
    .then((data) => {
      const officeResult = data.data;
      console.log(officeResult);
      cardResult.innerHTML = '';
      if (candidateArray.length !== 0) {
        candidateArray.forEach((candidate, index) => {
          cardResult.innerHTML += `
              <div class="result-card">
                <h4>
                  <b>${candidate.candidate_name}</b>
                  <span>
                    ${officeResult[index] ? officeResult[index].count : 0} Votes
                  <span>
                </h4>
              </div>`;
        });
      } else {
        cardResult.innerHTML += '<p>No Result for this office</p>';
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

const candidateCard = document.getElementById('particularOfficeOutput');
const err_output = document.getElementById('err_output');

async function officeCandidates(officeId) {
  await fetch(`${HOST}/api/v1/offices/${officeId}/candidate`, {
    headers: { 'x-access-token': user.token },
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      const particularOffices = data.data;
      candidateCard.innerHTML = '';
      if (particularOffices.length !== 0) {
        particularOffices.forEach((item) => {
          candidateCard.innerHTML += `
            <div class="card">
              <div class="card-img">
                <img src="${!!item.candidate_avatar ? item.candidate_avatar : '../images/no-avatar.png' }" alt="user photo">
            </div>
            <div class="card-right">
                <div class="card-content">
                <p class="title">${item.candidate_name}</p>
                </div>
            </div>
            <div class="card-button">
                <button class="cardbtn-vote" onclick="vote(${item.office},${item.candidate_user}); modal('particular_office')">Vote &check;</button>
            </div>
        </div>`;
        });
      } else {
        candidateCard.innerHTML = '<br><p style="text-align:center;"><em>No Candidate Contesting in this Office<em></p>';
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

async function vote(officeId, candidateId) {
  const voteData = {
    office: officeId,
    candidate: candidateId,
  };

  console.log(voteData)

  await fetch(`${HOST}/api/v1/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    body: JSON.stringify(voteData),
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.status !== 201) {
        err_output.innerText = data.error;
        errorClass();
      } else {
        err_output.innerText = 'Vote Recorded Successfully';
        errorClass();
      }
    }).catch((error) => {
      console.log(error);
    });
}

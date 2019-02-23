const card = document.getElementById('party');
document.getElementById('currentUser').innerText += ` ${user.name}`;

// fetch api to get all parties
fetch(`${HOST}/api/v1/parties`, {
  headers: {
    'x-access-token': user.token,
  },
})
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    const parties = data.data;
    if (parties.length !== 0) {
      parties.forEach((party) => {
        card.innerHTML += `
            <div class="column">
              <div class="square-card">
                <img src="../images/flags/flags.png" alt="party logo">
                <div class="sqaure-card-container">
                 <h4><b>${party.name}</b></h4>

                <button class="cardbtn" onclick="modal('edit_party'); getAParty(${party.party_id})">Edit</button>
                <button class="cardbtn" onclick="deleteParty(${party.party_id})">Delete</button>
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

// Function to add new party using fetch api
async function addNewParty(event) {
  event.preventDefault();

  const newPartyData = {
    name: document.getElementById('partyName').value,
    hqAddress: document.getElementById('partyAddress').value,
    logoUrl: document.getElementById('partyLogo').value,
  };

  await fetch(`${HOST}/api/v1/parties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    body: JSON.stringify(newPartyData),
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.status !== 201) {
        document.getElementById('party_err_output').innerHTML = `${data.error}`;
      } else {
        document.getElementById('party_output').innerHTML = 'New Party Created';
        window.location.reload();
      }
    }).catch((error) => {
      document.getElementById('party_err_output').innerHTML = 'Error Creating Account';
    });
}

document.getElementById('create_party').addEventListener('submit', addNewParty);


// Deleting a party
async function deleteParty(partyId) {
  const id = partyId;
  await fetch(`${HOST}/api/v1/parties/${id}`, {
    method: 'DELETE',
    headers: {
      'x-access-token': user.token,
    },
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.status !== 204) {
        console.log(data.error);
      } else {
        console.log(data.data);
        location.reload();
      }
    })
    .catch((error) => {
      console.log('error deleting party');
    });
}

// Updating a Party
async function updateParty(partyId) {
  const updatePartyData = {
    name: document.getElementById('editPartyName').value,
    hqAddress: document.getElementById('editPartyAddress').value,
    logoUrl: document.getElementById('editPartyLogo').value,
  };

  console.log(updatePartyData);

  await fetch(`${HOST}/api/v1/parties/${partyId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    body: JSON.stringify(updatePartyData),
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.status !== 200) {
        console.log(data.error);
      } else {
        console.log('updated');
        window.location.reload();
      }
    }).catch((error) => {
      console.log(error);
    });
}

// get a party
async function getAParty(partyId) {
  const id = partyId;
  await fetch(`${HOST}/api/v1/parties/${id}`, {
    headers: {
      'x-access-token': user.token,
    },
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.status !== 200) {
        console.log(data.error);
      } else {
        console.log(data.data[0]);
        document.getElementById('editPartyId').value = id;
        document.getElementById('editPartyName').value = data.data[0].name;
        document.getElementById('editPartyAddress').value = data.data[0].hqaddress;
        document.getElementById('editPartyLogo').value = data.data[0].logourl;
      }
    })
    .catch((error) => {
      console.log('error getting party', error);
    });
}

// Function to add new office using fetch api
async function addNewOffice(event) {
  event.preventDefault();

  const newOfficeData = {
    type: document.getElementById('officeType').value,
    name: document.getElementById('officeName').value,
  };

  await fetch(`${HOST}/api/v1/offices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    body: JSON.stringify(newOfficeData),
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.status !== 201) {
        document.getElementById('office_err_output').innerHTML = `${data.error}`;
      } else {
        document.getElementById('office_output').innerHTML = `
            New Office Created
            &nbsp;<br>
            <div class="modalbtn-section">
              <button type="button" onclick="modal('create_office')" class="modalbtn success-btn">Ok</button>
            </div>`;
      }
    }).catch((error) => {
      document.getElementById('office_err_output').innerHTML = 'Error Creating New Office';
    });
}

document.getElementById('create_office').addEventListener('submit', addNewOffice);

async function getCandidate() {
  const candidate = document.getElementById('chooseCandidate');
  const office = document.getElementById('chooseOffice');
  await fetch(`${HOST}/api/v1/auth/users`, {
    headers: { 'x-access-token': user.token },
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      const allUsers = data.data;
      console.log(allUsers);
      if (allUsers.length !== 0) {
        let candidateOptions = '<option>Select...</option>';
        allUsers.forEach((user) => {
          candidateOptions += `<option value=${user.user_id}>${user.firstname} ${user.lastname}</option>`;
          candidate.innerHTML = candidateOptions;
        });
      } else {
        candidate.innerHTML = '<option>No User</option>';
      }
    });

  await fetch(`${HOST}/api/v1/offices`, {
    headers: { 'x-access-token': user.token },
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      const allOffices = data.data;
      console.log(allOffices);
      if (allOffices.length !== 0) {
        let officeOptions = '<option>Select...</option>';
        allOffices.forEach((item) => {
          officeOptions += `<option value=${item.office_id}> ${item.name} (${item.type})</option>`;
          office.innerHTML = officeOptions;
        });
      } else {
        office.innerHTML = '<option>No Office Avaliable</option>';
      }
    });
}

async function makeCandidate(event) {
  event.preventDefault();

  const makeCandidateData = {
    office_id: document.getElementById('chooseOffice').value,
    candidate_id: document.getElementById('chooseCandidate').value,
  };

  await fetch(`${HOST}/api/v1/offices/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': user.token,
    },
    body: JSON.stringify(makeCandidateData),
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.status !== 201) {
        if (makeCandidateData.office_id === 'Select...' || makeCandidateData.candidate_id === 'Select...') {
          document.getElementById('candidate_err_output').innerHTML = 'Please Select an Office and Candidate';
        }else {
          document.getElementById('candidate_err_output').innerHTML = `${data.error}`;
        }
      } else {
        document.getElementById('make_candidate').innerHTML = 'New Candidate';
        window.location.reload();
      }
    }).catch((error) => {
      document.getElementById('candidate_err_output').innerHTML = 'Error Making Candidate';
    });
}

document.getElementById('makeCandidateBtn').addEventListener('click', makeCandidate);

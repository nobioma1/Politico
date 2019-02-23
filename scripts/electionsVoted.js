// Insert Name of Current User
document.getElementById('currentUser').innerText += ` ${user.name}`;
// Elections User Voted Table
const votedTable = document.getElementById('list-table');
// Get the current UserId Stored as a Cookie
const curr = user.x;

/**
 * Fetch Elections the Current User Voted,
 * Then Inserts the Data into the Table if Data exists
 */
async function electionsVoted() {
  await fetch(`${HOST}/api/v1/voted/${curr}`, {
    headers: { 'x-access-token': user.token },
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      // an Array of data
      const voted = data.data;
      if (voted.length !== 0) {
        voted.forEach((element) => {
          votedTable.innerHTML += `
        <tr>
          <td>${element.office.name} <small>(${element.office.type})</small></td>
          <td>${element.candidate.firstname} ${element.candidate.lastname}</td>
        </tr>`;
        });
      } else {
        document.getElementById('noInfo').innerHTML = `
          &nbsp;
          <p style="text-align:center;">You haven't voted for Candidate yet</p>.<br>
          <a href="/pages/user.html">
            <button class="modalbtn success-btn">
              Click to View Open Elections
            </button>
          </p>`;
      }
    });
}

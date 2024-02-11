const API_URL = "https://reqres.in/api/users";
let userInfoData = [];
const userContainer = document.getElementById("user-container");

async function getUserInfo() {
  try {
    const data = await fetch(API_URL);
    const dataInJson = await data.json();
    userInfoData = dataInJson.data;
    generateAllCards(userInfoData);
  } catch (error) {
    console.log("There was an error", error);
    userInfoData = [];
  }
}

function createCardUI(user) {
    let cardUI = `
      <div class="card m-4" style="width: 18rem;">
        <img src=${user.avatar} class="card-img-top" alt="...">
        <div class="card-body">
          <h1>${user.first_name} ${user.last_name}</h1>
          <p class="card-text">${user.email}</p>
          <button class="btn btn-primary" onclick="toggleDetails(${user.id})">Get Details</button>
          <div id="details-${user.id}" style="display: none;">
            <p>Email: ${user.email}</p>
            <p>Avatar: <img src="${user.avatar}" alt="avatar"></p>
          </div>
        </div>
      </div>
    `;
    userContainer.innerHTML += cardUI;
  }

function generateAllCards(userData = []) {
  for (let i = 0; i < userData.length; i++) {
    createCardUI(userData[i]);
  }
}

function toggleDetails(userId) {
  const detailsDiv = document.getElementById(`details-${userId}`);
  if (detailsDiv.style.display === "none") {
    detailsDiv.style.display = "block";
  } else {
    detailsDiv.style.display = "none";
  }
}

getUserInfo();
const baseUrl = 'http://localhost:8080';

async function getData() {
  const reach = await fetch(`${baseUrl}/api/pets`);
  const data = await reach.json();
  return data;
}

function addElementToCardsContainer(data, card) {
  const container = document.querySelector('.cards-container');
  data.forEach((element) => {
    container.append(card(element));
  });
}

const petsObjShape = {
  id: 1,
  name: 'Bella',
  dob: '2014-12-31T22:00:00.000Z',
  client_email: 'bellaowner@email.com',
  archived: 0,
};

function simpleButton(text, classname, action) {
  const but = document.createElement('button');
  but.textContent = text;
  but.className = classname;
  but.addEventListener('click', () => {
    action();
  });
  return but;
}

function simpleContainer(classname) {
  const cont = document.createElement('div');
  cont.className = classname;
  return cont;
}

function actionViewLog(id) {
  window.location.href = `pet-log.html?id=${id}`;
}

function actionDelete() {}

function createCard(petObj) {
  const year = new Date(petObj.dob).getFullYear();
  const month = new Date(petObj.dob).getMonth() + 1;
  const day = new Date(petObj.dob).getDate();

  const dob = `${year}-${month <= 9 ? '0' + month : month}-${
    day <= 9 ? '0' + day : day
  }`;

  const maincont = simpleContainer('card');
  // Button wrapper
  const butcont = simpleContainer('but-div');
  const viewbutton = simpleButton('View Log', 'main-btn', () =>
    actionViewLog(petObj.id),
  );
  const delbutton = simpleButton('Delete', 'main-btn main-btn-inverse');
  butcont.append(viewbutton, delbutton);

  const content = `<h3>${petObj.name}</h3>
      <div class="card-text">
        <p>${dob}</p>
        <p>${petObj.client_email}</p>
      </div>
    `;

  maincont.innerHTML = content;
  maincont.append(butcont);

  return maincont;
}

getData().then((data) => {
  addElementToCardsContainer(data, createCard);
});

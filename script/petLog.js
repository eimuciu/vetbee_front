const baseURL = 'http://localhost:8080';
const paramsId = window.location.search.split('=')[1];

const logDataShape = {
  archived: 0,
  client_email: 'lunaowner@email.com',
  description: 'Medical records of pet',
  dob: '2014-12-31T22:00:00.000Z',
  id: 2,
  name: 'Luna',
  pet_id: 2,
  status: 'Healthy',
};

const prescriptionsDataShape = {
  client_email: 'bellaowner@email.com',
  medication: 'Huberium',
  medicationDescription: 'medication for huberium',
  petDOB: '2014-12-31T22:00:00.000Z',
  petName: 'Bella',
  prescription: 'get healthy',
};

async function getLogs() {
  const response = await fetch(`${baseURL}/api/logs/${paramsId}`);
  const logsData = await response.json();
  return logsData;
}

async function getPrescriptions() {
  const response = await fetch(`${baseURL}/api/prescriptions/${paramsId}`);
  const prescriptionData = await response.json();
  return prescriptionData;
}

function simpleContainer() {
  const divel = document.createElement('div');
  return divel;
}

function logCard() {
  return `<div style="width: 100px; height: 100px; background-color: yellow">Log</div>`;
}

function prescriptionsCard() {
  return `<div style="width: 100px; height: 100px; background-color: orange">Prescriptions</div>`;
}

const paintstore = {
  log: logCard(),
  prescription: prescriptionsCard(),
};

function somethingAction(arr) {
  const divel = simpleContainer();
  divel.style.display = 'flex';
  divel.style.gap = '10px';
  arr.forEach((element) => {
    element[1].forEach((item) => {
      divel.insertAdjacentHTML('beforeend', paintstore[element[0]]);
    });
  });
  return divel;
}

async function paintContent() {
  const logs = await getLogs();
  const prescriptions = await getPrescriptions();
  return somethingAction([
    ['log', logs],
    ['prescription', prescriptions],
  ]);
}

const datastore = {
  log: getLogs(),
  prescription: getPrescriptions(),
};

function getDataPromiseBased() {}

async function getItemsByFilter(activecontentitemsarray) {
  const data = [];

  const promisesArray = activecontentitemsarray.map((item) => datastore[item]);

  const callPromises = await Promise.all(promisesArray);
  callPromises.forEach((item, index) =>
    data.push([activecontentitemsarray[index], item]),
  );

  paintToMainContainer(somethingAction(data));
}

let activeContent = ['prescription', 'log'];

function filterOut(filter, isRemove) {
  if (isRemove) {
    activeContent.splice(activeContent.indexOf(filter), 1);
    getItemsByFilter(activeContent);
  } else {
    activeContent.push(filter);
    getItemsByFilter(activeContent);
  }
}

function paintToMainContainer(data) {
  const cardsContainer = document.querySelector('.cards-container');
  cardsContainer.innerHTML = '';
  cardsContainer.append(data);
}

function logsBtnListener() {
  const btn = document.getElementById('logs-btn');
  let isActive = true;
  btn.addEventListener('click', async () => {
    if (isActive) {
      filterOut('log', isActive);
      isActive = false;
      // SANDBOX
      // 1. Paint Prescriptions
      // 2. Paint Only Prescriptions

      // const prescriptions = await getPrescriptions();
      // paintToMainContainer(somethingAction([['prescription', prescriptions]]));
    } else {
      filterOut('log', isActive);
      isActive = true;
      // SANDBOX
      // 1. Paint Prescriptions
      // 2. Paint Logs
      // 3. Paint Both
      // const prescriptions = await getPrescriptions();
      // const logs = await getLogs();
      // paintToMainContainer(
      //   somethingAction([
      //     ['prescription', prescriptions],
      //     ['log', logs],
      //   ]),
      // );

      // const divel1 = document.createElement('div');
      // prescriptions.forEach((item) => {
      //   divel1.insertAdjacentHTML('beforeend', prescriptionsCard());
      //   logs.forEach((element) => {
      //     divel1.insertAdjacentHTML('beforeend', logCard());
      //   });
      //   paintToMainContainer(divel1);
      // });
    }
  });
}

function prescriptionBtnListener() {
  const btn = document.getElementById('prescriptions-btn');
  let isActive = true;
  btn.addEventListener('click', async () => {
    if (isActive) {
      filterOut('prescription', isActive);
      isActive = false;
      //SANDBOX
      // const logs = await getLogs();
      // paintToMainContainer(somethingAction([['log', logs]]));
    } else {
      filterOut('prescription', isActive);
      isActive = true;
      // SANDBOX
      // const prescriptions = await getPrescriptions();
      // const logs = await getLogs();
      // paintToMainContainer(
      //   somethingAction([
      //     ['prescription', prescriptions],
      //     ['log', logs],
      //   ]),
      // );
    }
  });
}

paintContent().then((data) => paintToMainContainer(data));
logsBtnListener();
prescriptionBtnListener();

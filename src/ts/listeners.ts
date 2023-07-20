import { createCar, deleteCar, getAllCars, updateCar } from './api/api';
import { generateGarage } from './utils/createRoad';
import { counterMaxPage, index, page, carsCount } from './utils/counting';
import { generateRandomCars } from './utils/generateCars';
import { fillCurrentPage } from './view/fillPage';
import { startCar, carStop } from './stateMotion/stateCar';

const btnCreate = document.getElementById('btn-create');
const btnUpdate = document.getElementById('btn-update');
const btnGenerate = document.getElementById('btn-generate');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');

btnCreate.addEventListener('click', async () => {
  const getColorCar = (<HTMLInputElement>document.getElementById('colorCar')).value;
  const getNameCar = (<HTMLInputElement>document.getElementById('nameCar')).value;
  await counterMaxPage()();
  await createCar({ name: getNameCar, color: getColorCar });
  await fillCurrentPage();
  carsCount(1);
});

const updNameCar = <HTMLInputElement>document.getElementById('updNameCar');
const updColorCar = <HTMLInputElement>document.getElementById('updColorCar');

btnUpdate.addEventListener('click', () => {
  if (index.current === -1) {
    return;
  }
  const roadsQueryAll = document.querySelectorAll('.road');
  const id = index.current + 1 + 7 * (page.number - 1);
  const modelCarQuery = roadsQueryAll[index.current].querySelector('.car__model');
  const svgCarQuery = roadsQueryAll[index.current].querySelector('.car svg g');

  modelCarQuery.innerHTML = updNameCar.value;
  svgCarQuery.setAttribute('fill', updColorCar.value);
  updateCar(id, { name: updNameCar.value, color: updColorCar.value }).catch((err) => console.log(err));
  updColorCar.value = '#000000';
  updNameCar.value = '';
  index.current = -1;
});

document.querySelector('.garage').addEventListener('click', (e) => {
  const targetElem = <HTMLElement>e.target;
  const roadElem = targetElem.closest('.road');
  const idValue = Number(roadElem.id.split('-')[1]);
  if (!roadElem) {
    return;
  }
  const startBtn = <HTMLButtonElement>roadElem.querySelector('.btn-start');
  const stopBtn = <HTMLButtonElement>roadElem.querySelector('.btn-stop');
  const car = <HTMLElement>roadElem.querySelector('.car');
  if (targetElem.closest('.btn-select')) {
    index.current = idValue;
    const carModel = roadElem.querySelector('.car__model');
    const svgCarQuery = roadElem.querySelector('.car svg g');
    updColorCar.value = svgCarQuery.getAttribute('fill');
    updNameCar.value = carModel.textContent;
  }
  if (targetElem.closest('.btn-remove')) {
    deleteCar(idValue).catch((err) => console.log(err));
    roadElem.remove();
    carsCount(-1);
  }
  if (targetElem.closest('.btn-start')) {
    startCar(car, startBtn, stopBtn, idValue);
  }
  if (targetElem.closest('.btn-stop')) {
    carStop(car, startBtn, stopBtn);
  }
});

btnGenerate.addEventListener('click', async () => {
  const carsRandom = generateRandomCars();
  for (let i = 0; i < carsRandom.length; i++) {
    carsCount(1);
    await createCar({ name: carsRandom[i].name, color: carsRandom[i].color });
  }
  await fillCurrentPage();
});

btnNext.addEventListener('click', async () => {
  const maxPagePromise = counterMaxPage()();
  if (page.number >= (await maxPagePromise)) {
    return;
  }
  page.number += 1;
  await fillCurrentPage();
});

btnPrev.addEventListener('click', async () => {
  if (page.number <= 1) {
    return;
  }
  page.number -= 1;
  await fillCurrentPage();
});

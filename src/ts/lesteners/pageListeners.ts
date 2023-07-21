import { carsCount, counterMaxPage, index, page } from '../utils/counting';
import { createCar, updateCar } from '../api/api';
import { fillCurrentPage } from '../view/fillPage';
import { generateRandomCars } from '../utils/generateCars';
import { fillCurrentWinners } from '../view/fillWinners';
const btnCreate = document.getElementById('btn-create');
const btnUpdate = document.getElementById('btn-update');
const btnGenerate = document.getElementById('btn-generate');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const btnToGarage = <HTMLButtonElement>document.getElementById('btn-to-garage');
const btnToWinners = <HTMLButtonElement>document.getElementById('btn-to-winners');
const mainQuery = document.querySelector('.main');
const winnersQuery = document.querySelector('.winners');

btnToWinners.addEventListener('click', () => {
  btnToWinners.disabled = true;
  btnToGarage.disabled = false;
  mainQuery.classList.add('hidden');
  winnersQuery.classList.remove('hidden');
  fillCurrentWinners();
});

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

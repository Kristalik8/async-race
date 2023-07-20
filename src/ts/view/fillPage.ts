import { generateGarage } from '../utils/createRoad';
import { getAllCars, getCurrentGarage } from '../api/api';
import { counterMaxPage, carsCount, page } from '../utils/counting';

async function fillCurrentPage() {
  const garageQuery = document.querySelector('.garage');
  const currentPage = document.querySelector('.page-num');
  garageQuery.innerHTML = '';
  currentPage.textContent = String(page.number);
  const currentGarage = await getCurrentGarage(page.number);
  generateGarage(currentGarage);
  await counterMaxPage()();
}

async function callCarsCount() {
  const cars = await getAllCars();
  carsCount(cars.length);
}
fillCurrentPage();
callCarsCount();

export { fillCurrentPage, page };

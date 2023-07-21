import { deleteCar } from '../api/api';
import { index, carsCount } from '../utils/counting';
import { startCar, stopCar } from '../stateMotion/stateCar';
import {fillCurrentPage} from "../view/fillPage";

const updNameCar = <HTMLInputElement>document.getElementById('updNameCar');
const updColorCar = <HTMLInputElement>document.getElementById('updColorCar');
import {clickRace} from "../utils/counting";
document.querySelector('.garage').addEventListener('click', (e) => {
  const targetElem = <HTMLElement>e.target;
  const roadElem = targetElem.closest('.road');
  const idValue = Number(roadElem.id.split('-')[1]);
  if (!roadElem) {
    return;
  }
  if (targetElem.closest('.btn-select')) {
    index.current = idValue;
    const carModel = roadElem.querySelector('.car__model');
    const svgCarQuery = roadElem.querySelector('.car svg g');
    updColorCar.value = svgCarQuery.getAttribute('fill');
    updNameCar.value = carModel.textContent;
  }
  if (targetElem.closest('.btn-remove')) {
    deleteCar(idValue).catch((err) => console.log(err));
    fillCurrentPage();
    carsCount(-1);
  }
  if (targetElem.closest('.btn-start')) {
    clickRace.bool = false;
    startCar(idValue);
  }
  if (targetElem.closest('.btn-stop')) {
    stopCar(idValue);
  }
});

import { deleteCar } from '../api/api';
import { index, carsCount } from '../utils/counting';
import { startCar, carStop } from '../stateMotion/stateCar';

const updNameCar = <HTMLInputElement>document.getElementById('updNameCar');
const updColorCar = <HTMLInputElement>document.getElementById('updColorCar');
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

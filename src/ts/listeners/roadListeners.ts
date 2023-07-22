import { deleteCar, deleteWinner, getWinner } from '../api/api';
import { index, carsCount } from '../utils/counting';
import { startCar, stopCar } from '../stateMotion/stateCar';
import { fillCurrentPage } from '../view/fillPage';

const updNameCar = <HTMLInputElement>document.getElementById('updNameCar');
const updColorCar = <HTMLInputElement>document.getElementById('updColorCar');
document.querySelector('.garage').addEventListener('click', async (e) => {
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
    await deleteCar(idValue);
    if (await getWinner(idValue)) {
      await deleteWinner(idValue);
    }

    await fillCurrentPage();
    carsCount(-1);
  }
  if (targetElem.closest('.btn-start')) {
    startCar(idValue);
  }
  if (targetElem.closest('.btn-stop')) {
    stopCar(idValue);
  }
});

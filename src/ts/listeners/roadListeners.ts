import { deleteCar, deleteWinner, checkExistWinner } from '../api/api';
import { index, carsCount } from '../utils/counting';
import { startCar, stopCar } from '../stateMotion/stateDrive';
import { fillCurrentPage } from '../view/fillGarage';

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
    const carName = roadElem.querySelector('.car__name');
    const svgCarQuery = roadElem.querySelector('.car svg g');
    updColorCar.value = svgCarQuery.getAttribute('fill');
    updNameCar.value = carName.textContent;
  }
  if (targetElem.closest('.btn-remove')) {
    await deleteCar(idValue);

    if (await checkExistWinner(idValue)) {
      await deleteWinner(idValue);
    }

    await fillCurrentPage();
    carsCount(-1);
  }
  if (targetElem.closest('.btn-start')) {
    await startCar(idValue);
  }
  if (targetElem.closest('.btn-stop')) {
    await stopCar(idValue);
  }
});

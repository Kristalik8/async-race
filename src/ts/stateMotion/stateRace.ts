import { startCar, stopCar } from './stateCar';
import { addWinner } from '../utils/addWinner';

async function race() {
  const targetPosition = window.innerWidth - 110;
  const cars = document.querySelectorAll('.car');
  const carIds = Array.from(cars).map((car) => Number(car.closest('.road').id.split('-')[1]));
  const promises = carIds.map((id) => startCar(id));
  const timeStart = new Date().getTime();
  await Promise.race(promises);
  function checkPositions() {
    let winnerId = null;
    for (let i = 0; i < cars.length; i++) {
      const car = <HTMLElement>cars[i];
      const transformStyle = car.style.transform;
      const match = transformStyle.match(/translateX\((-?\d+\.?\d*)px\)/);
      const value = match ? parseFloat(match[1]) : null;
      if (value >= targetPosition) {
        const roadE = car.closest('.road');
        winnerId = Number(roadE.id.split('-')[1]);
        addWinner(timeStart, winnerId, roadE);
        break;
      }
    }

    if (!winnerId) {
      requestAnimationFrame(checkPositions);
    }
  }
  requestAnimationFrame(checkPositions);
}

async function reset() {
  const messageWinner = document.querySelector('.message-winner');
  messageWinner.classList.add('hidden');
  const cars = document.querySelectorAll('.car');
  const carIds = Array.from(cars).map((car) => Number(car.closest('.road').id.split('-')[1]));
  const promises = carIds.map((id) => stopCar(id));
  await Promise.all(promises);
}

export { race, reset };

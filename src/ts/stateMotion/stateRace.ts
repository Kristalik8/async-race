import { startCar, stopCar} from "./stateDrive";
import { addWinner } from '../utils/addWinner';
import { clearAnimation, clickRace } from '../utils/counting';

let animationRace: number;

function clearAnimationRace() {
  cancelAnimationFrame(animationRace);
}

async function race() {
  clickRace.bool = true;
  clearAnimationRace();
  animationRace = 0;
  const arrWinnersEngineBroke: number[] = [];
  clearAnimation();
  const targetPosition = window.innerWidth - 110;
  const cars = document.querySelectorAll('.car');
  const carIds = Array.from(cars).map((car) => Number(car.closest('.road').id.split('-')[1]));
  const promises = carIds.map((id) => startCar(id));
  await Promise.all(promises);
  async function checkPositions() {
    let idWinner = null;
    let winnerEngineBroke = false;
    for (let i = 0; i < cars.length; i++) {
      if (arrWinnersEngineBroke.includes(i)) {
        continue;
      }
      if (arrWinnersEngineBroke.length === 7) {
        clearAnimationRace();
      }
      const car = <HTMLElement>cars[i];
      const transformStyle = car.style.transform;
      const match = transformStyle.match(/translateX\((-?\d+\.?\d*)px\)/);
      const value = match ? parseFloat(match[1]) : null;
      if (value >= targetPosition) {
        const roadE = car.closest('.road');
        idWinner = Number(roadE.id.split('-')[1]);
        winnerEngineBroke = await (await promises[i]).stateEngine;
        if (winnerEngineBroke) {
          arrWinnersEngineBroke.push(i);
          animationRace = requestAnimationFrame(checkPositions);
        }
        if (!winnerEngineBroke) {
          await addWinner(idWinner, roadE);
          break;
        }
      }
    }
    if (!idWinner) {
      animationRace = requestAnimationFrame(checkPositions);
    }
  }

  requestAnimationFrame(checkPositions);
}

async function reset() {
  clickRace.bool = false;
  clearAnimationRace();
  const messageWinner = document.querySelector('.message-winner');
  messageWinner.classList.add('hidden');
  const cars = document.querySelectorAll('.car');
  const carIds = Array.from(cars).map((car) => Number(car.closest('.road').id.split('-')[1]));
  const promises = carIds.map((id) => stopCar(id));
  await Promise.all(promises);
}

export { race, reset };

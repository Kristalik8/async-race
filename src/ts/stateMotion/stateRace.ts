import { startCar, stopCar } from './stateCar';
import { addWinner } from '../utils/addWinner';
import {clearAnimation, clickRace} from '../utils/counting';
let animationRace: number;
async function race() {
  animationRace = 0;
  clickRace.bool = true;
  clearAnimation();
  const targetPosition = window.innerWidth - 110;
  const cars = document.querySelectorAll('.car');
  const carIds = Array.from(cars).map((car) => Number(car.closest('.road').id.split('-')[1]));
  const promises = carIds.map((id) => startCar(id));
  const timeStart = new Date().getTime();
  await Promise.race(promises);
  checkAllEngines(promises);
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
      animationRace = requestAnimationFrame(checkPositions);
    }
  }
  requestAnimationFrame(checkPositions);
}

function checkAllEngines(promises: Promise<boolean>[]) {
  setTimeout(async ()=> {
    let engineStatus = await Promise.all(promises);
    const engineAllBroke = engineStatus.every(e=>e===true);
    if(engineAllBroke) {
      cancelAnimationFrame(animationRace);
    }
  }, 10000)

}

const btnRace = <HTMLButtonElement>document.getElementById('race');
const btnReset = <HTMLButtonElement>document.getElementById('reset');
async function reset() {
  btnRace.disabled = false;
  btnReset.disabled = true;
  const messageWinner = document.querySelector('.message-winner');
  messageWinner.classList.add('hidden');
  const cars = document.querySelectorAll('.car');
  const carIds = Array.from(cars).map((car) => Number(car.closest('.road').id.split('-')[1]));
  const promises = carIds.map((id) => stopCar(id));
  await Promise.all(promises);
}

export { race, reset };

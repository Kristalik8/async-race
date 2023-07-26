import { brokeEngine, velocityCar, getStopCar } from '../api/api';
import { ResultsNumber, ResultsBoolean } from '../types';
import { animation, clickRace, containerTimesRace } from '../utils/counting';

const clickStop: ResultsBoolean = {};

function brokeMessage(id: number) {
  const roadE = <HTMLElement>document.querySelector(`#road-${id}`);
  const carName = roadE.querySelector('.car__name').textContent;
  const messageBrokeQuery = roadE.querySelector('.message-broke');
  const add = () => {
    if (!clickStop[id]) {
      roadE.style.backgroundColor = 'rgba(212, 3, 3, 0.24)';
      messageBrokeQuery.classList.remove('hidden');
      messageBrokeQuery.textContent = `${carName} engine was broken down`;
    }
  };
  const hid = () => {
    if (roadE.style.backgroundColor === 'rgba(212, 3, 3, 0.24)') {
      roadE.style.backgroundColor = '';
      messageBrokeQuery.classList.add('hidden');
    }
  };
  return { add, hid };
}

async function startCar(id: number) {
  clickStop[id] = false;
  const startBtn = <HTMLButtonElement>document.querySelector(`#road-${id} .btn-start`);
  const stopBtn = <HTMLButtonElement>document.querySelector(`#road-${id} .btn-stop`);
  const car = <HTMLElement>document.querySelector(`#road-${id} .car`);
  startBtn.disabled = true;
  let velocity = await velocityCar(id);
  const timeStart = new Date().getTime();

  function animate() {
    const state: ResultsNumber = {};
    const screenWidth = window.innerWidth;
    const end = screenWidth - 110;
    let currentX = car.offsetLeft;
    velocity = Number((velocity / 10).toFixed(2));
    if (screenWidth >= 1400 && screenWidth < 2500) {
      velocity = Number((velocity / 2).toFixed(2));
    }
    if (screenWidth >= 800 && screenWidth < 1400) {
      velocity = Number((velocity / 3).toFixed(2));
    }
    if (screenWidth >= 650 && screenWidth < 800) {
      velocity = Number((velocity / 4).toFixed(2));
    }
    if (screenWidth < 650) {
      velocity = Number((velocity / 5).toFixed(2));
    }
    async function interval() {
      currentX += velocity;
      car.style.transform = `translateX(${Math.min(currentX, end)}px)`;
      if (currentX < end) {
        state.id = window.requestAnimationFrame(interval);
      } else {
        if (clickRace.bool) {
          const timeEnd = new Date().getTime();
          containerTimesRace[id] = Number(((timeEnd - timeStart) / 1000).toFixed(2));
        }
      }
    }

    state.id = window.requestAnimationFrame(interval);
    return state;
  }
  animation[id] = animate();
  const stateEngine = brokeEngine(id).then((r) => {
    if (r && animation[id]) {
      cancelAnimationFrame(animation[id].id);
      brokeMessage(id).add();
    }
    return r;
  });
  stopBtn.disabled = false;
  return { stateEngine, id };
}

async function stopCar(id: number) {
  clickStop[id] = true;
  await getStopCar(id);
  brokeMessage(id).hid();
  const car = <HTMLElement>document.querySelector(`#road-${id} .car`);
  const startBtn = <HTMLButtonElement>document.querySelector(`#road-${id} .btn-start`);
  const stopBtn = <HTMLButtonElement>document.querySelector(`#road-${id} .btn-stop`);
  startBtn.disabled = false;
  if (animation[id]) {
    cancelAnimationFrame(animation[id].id);
  }
  stopBtn.disabled = true;
  car.style.transform = 'translateX(0)';
}

export { startCar, stopCar };

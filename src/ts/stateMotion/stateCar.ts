import { brokeEngine, velocityCar } from '../api/api';
import { Results } from '../types';
import { animation } from '../utils/counting';

async function startCar(id: number) {
  const startBtn = <HTMLButtonElement>document.querySelector(`#road-${id} .btn-start`);
  const stopBtn = <HTMLButtonElement>document.querySelector(`#road-${id} .btn-stop`);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  let velocity = await velocityCar(id);

  function animate() {
    const state: Results = {};
    const car = <HTMLElement>document.querySelector(`#road-${id} .car`);
    const screenWidth = window.innerWidth;
    const end = screenWidth - 110;
    let currentX = car.offsetLeft;
    if (screenWidth >= 1000) {
      velocity = Number((velocity / 34).toFixed(2));
    }
    if (screenWidth >= 800 &&screenWidth < 1000) {
      velocity = Number((velocity / 52).toFixed(2));
    }
    if (screenWidth >= 670 && screenWidth < 800) {
      velocity = Number((velocity / 37/2).toFixed(2));
    }
    if (screenWidth < 670) {
      velocity = Number((velocity /40/3).toFixed(2));
    }
    async function interval() {
      currentX += velocity;
      car.style.transform = `translateX(${Math.min(currentX, end)}px)`;
      if (currentX < end) {
        state.id = window.requestAnimationFrame(interval);
      }
    }

    state.id = window.requestAnimationFrame(interval);
    return state;
  }

  animation[id] = animate();

  const broke = await brokeEngine(id).then((r) => {
    if (r) {
      cancelAnimationFrame(animation[id].id);
    }
    return r;
  });
  return { id, broke };
}

async function stopCar(id: number) {
  const car = <HTMLElement>document.querySelector(`#road-${id} .car`);
  const startBtn = <HTMLButtonElement>document.querySelector(`#road-${id} .btn-start`);
  const stopBtn = <HTMLButtonElement>document.querySelector(`#road-${id} .btn-stop`);
  stopBtn.disabled = true;
  startBtn.disabled = false;
  cancelAnimationFrame(animation[id].id);
  car.style.transform = 'translateX(0)';
}

export { startCar, stopCar };

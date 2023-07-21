import { velocityCar, brokeEngine } from '../api/api';
let animationFrameId: number;
async function startCar(car: HTMLElement, startBtn: HTMLButtonElement, stopBtn: HTMLButtonElement, id: number) {
  let currentX = car.offsetLeft;
  let velocity = await velocityCar(id);
  const screenWidth = window.innerWidth;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  const end = screenWidth - 140;
  velocity = velocity / 8;

  const broke = await brokeEngine(id);
  async function interval() {
    currentX += velocity;
    car.style.transform = `translateX(${Math.min(currentX, end)}px)`;
    if (broke) {
      cancelAnimationFrame(animationFrameId);
    }
    if (currentX < end) {
      animationFrameId = requestAnimationFrame(interval);
    }
  }

  await interval();
}

function carStop(car: HTMLElement, startBtn: HTMLButtonElement, stopBtn: HTMLButtonElement) {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  cancelAnimationFrame(animationFrameId);
  car.style.transform = 'translateX(0)';
}

export { startCar, carStop };

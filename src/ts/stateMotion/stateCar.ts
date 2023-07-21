import {brokeEngine, getWinners, velocityCar} from '../api/api';
import {Results} from "../types";
import {clickRace, winners} from "../utils/counting";

let animation: Results = {};

async function startCar(id: number) {
    const car = <HTMLElement>document.querySelector(`#road-${id} .car`);
    const startBtn = <HTMLButtonElement>document.querySelector(`#road-${id} .btn-start`);
    const stopBtn = <HTMLButtonElement>document.querySelector(`#road-${id} .btn-stop`);
    let currentX = car.offsetLeft;
    let velocity = await velocityCar(id);
    const screenWidth = window.innerWidth;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    const end = screenWidth - 110;
    velocity = velocity / 4;
    const broke = await brokeEngine(id);
    animation[id] = id;
    let timeStart = new Date().getTime()
    function interval() {
        currentX += velocity;
        car.style.transform = `translateX(${Math.min(currentX, end)}px)`;
        if (broke) {
            console.log(id)
            cancelAnimationFrame(animation[id]);
            return;
        }
        if (currentX < end) {
            requestAnimationFrame(interval);
        } else {
            if (clickRace.bool) {
                let timeEnd = new Date().getTime();
                winners.race[id] = Number(((timeEnd - timeStart) / 1000).toFixed(2));
            }
        }
    }

    interval();
}


function stopCar(id: number) {
    const car = <HTMLElement>document.querySelector(`#road-${id} .car`);
    const startBtn = <HTMLButtonElement>document.querySelector(`#road-${id} .btn-start`);
    const stopBtn = <HTMLButtonElement>document.querySelector(`#road-${id} .btn-stop`);
    stopBtn.disabled = true;
    startBtn.disabled = false;
    cancelAnimationFrame(animation[id]);
    car.style.transform = 'translateX(0)';
}

export {startCar, stopCar};



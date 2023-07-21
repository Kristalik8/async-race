import {startCar, stopCar} from "./stateCar";
import {clickRace} from "../utils/counting";
import {winners} from "../utils/counting";
import {getWinners, updateWinner, createWinner, createCar} from "../api/api";

async function race() {
    clickRace.bool = true;
    winners.race = {};
    const cars = document.querySelectorAll('.car');
    const carIds = Array.from(cars).map(car => Number(car.closest('.road').id.split('-')[1]));
    const promises = carIds.map(id => startCar(id));
    await Promise.allSettled(promises);
    await addWinner();
}

async function addWinner() {
    let minTime = Infinity;
    let minKey = 0;
    for (const key in winners.race) {
        const time = winners.race[key];
        if (time < minTime) {
            minTime = time;
            minKey = Number(key);
        }
    }
    const {items} = await getWinners(winners.page);
    let foundId = false;
    items.forEach(items => {
        if (minKey === items.id) {
            foundId = true;
            let newContWins = items.wins + 1;
            let newTime = minTime;
            updateWinner(minKey, {wins: newContWins, time: newTime})
        }
    })

    if (!foundId) {
        await createWinner({id:minKey, wins:1, time:minTime})
    }

}



async function reset() {
    const cars = document.querySelectorAll('.car');
    const carIds = Array.from(cars).map(car => Number(car.closest('.road').id.split('-')[1]));
    carIds.forEach(id => stopCar(id));
}




export {race, reset}

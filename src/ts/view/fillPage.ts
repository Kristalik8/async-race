import {arrRoads, generateGarage} from "../utils/createRoad";
import {getAllCars} from "../api/api";
import {counterMaxPage} from "../utils/counting";
const garageQuery = document.querySelector('.garage');
export function fillCurrentPage(nextNum: number) {
    for (let i = 7 * nextNum - 7; i < 7 * nextNum; i++) {
        if(arrRoads[i]) {
            garageQuery.append(arrRoads[i]);
        }
    }
}

async function callGetAllCars() {
    const cars = await getAllCars();
    await generateGarage(cars);
    counterMaxPage()();
}
callGetAllCars().catch((error) => {
    throw new Error(`${error}`)
});

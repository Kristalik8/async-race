import {arrRoads} from "../utils/createRoad";
const garageQuery = document.querySelector('.garage');
export function fillCurrentPage(nextNum: number) {
    for (let i = 7 * nextNum - 7; i < 7 * nextNum; i++) {
        if(arrRoads[i]) {
            garageQuery.append(arrRoads[i]);
        }
    }
}

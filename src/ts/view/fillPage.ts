import {generateGarage} from "../utils/createRoad";
import {getAllCars, getCurrentGarage} from "../api/api";
import {counterMaxPage, carsCount} from "../utils/counting";
import {clickRoad} from "../listeners";
import {page} from "../utils/counting";

async function fillCurrentPage() {
    const garageQuery = document.querySelector('.garage');
    const currentPage = document.querySelector('.page-num');
    garageQuery.innerHTML = '';
    currentPage.textContent = String(page.number);
    const currentGarage = await getCurrentGarage(page.number);
    generateGarage(currentGarage);
    clickRoad();
}

async function callGetAllCars() {
    const cars = await getAllCars();
    await generateGarage(cars);
    await counterMaxPage()();
    carsCount(cars.length);
    clickRoad();
}

callGetAllCars().catch((error) => {
    throw new Error(`${error}`)
});

export {fillCurrentPage, page}

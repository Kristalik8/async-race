import {garage, createCar, getAllCars} from "./api/api";
import {additionData, generateGarage, arrRoads} from "./utils/createRoad";
import {fillCurrentPage} from "./view/fillPage";
import {counterMaxPage} from "./utils/counting";
import {generateRandomCars} from "./utils/generateCars";

const btnCreate = document.getElementById('btn-create');
const btnUpdate = document.getElementById('btn-update');
const btnGenerate = document.getElementById("btn-generate");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");


btnCreate.addEventListener('click', () => {
    let colorCar = (<HTMLInputElement>document.getElementById('colorCar')).value;
    let nameCar = (<HTMLInputElement>document.getElementById('nameCar')).value;
    additionData(nameCar, colorCar);
    counterMaxPage()();

    async function callCreateCar() {
        const car = await createCar({name: nameCar, color: colorCar});
        return car;
    }

    callCreateCar().catch((error) => {
        throw new Error(`${error}`)
    });
})


btnUpdate.addEventListener('click', () => {
    console.log(counterMaxPage()())
    console.log(arrRoads)
    console.log(garage)
})


btnGenerate.addEventListener('click', () => {
    const carsRandom = generateRandomCars();
    async function generateCars() {
        for (let i = 0; i < carsRandom.length; i++) {
            await createCar({name: carsRandom[i].name, color: carsRandom[i].color});
        }
        await generateGarage(carsRandom);
        counterMaxPage()();
    }

    generateCars().catch((error) => {
        throw new Error(`${error}`)
    });

})

let pageCurrent = 1;
const garageQuery = document.querySelector('.garage');
const currentPage = document.querySelector('.page-num');

btnNext.addEventListener('click', () => {
    if (pageCurrent >= counterMaxPage()()) {
        return
    }
    pageCurrent += 1;
    garageQuery.innerHTML = '';
    currentPage.textContent = String(pageCurrent);
    fillCurrentPage(pageCurrent);
})

btnPrev.addEventListener('click', () => {
    if (pageCurrent <= 1) {
        return;
    }
    pageCurrent -= 1;
    garageQuery.innerHTML = '';
    currentPage.textContent = String(pageCurrent);
    fillCurrentPage(pageCurrent);
})




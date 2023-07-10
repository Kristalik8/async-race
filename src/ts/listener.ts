import { createCar, getAllCars} from "./api/api";
import {additionData, generateGarage, arrRoads} from "./utils/createRoad";
import {fillCurrentPage} from "./view/fillPage";

const btnCreate = document.getElementById('btn-create');
const btnUpdate = document.getElementById('btn-update');
const btnGenerate = document.getElementById("btn-generate");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");

const numberPages = (): number => {
    const count = arrRoads.length;
    return Math.ceil(count/7);
}
let maxPage:number = 1;

btnCreate.addEventListener('click', () => {
    let colorCar = (<HTMLInputElement>document.getElementById('colorCar')).value;
    let nameCar = (<HTMLInputElement>document.getElementById('nameCar')).value;
    additionData(nameCar, colorCar);
    maxPage = numberPages();
    async function callCreateCar() {
        const car = await createCar({name: nameCar, color: colorCar});
        return car;
    }
    callCreateCar().catch((error) => {
        throw new Error(`${error}`)
    });
})


btnUpdate.addEventListener('click', () => {
    console.log(maxPage)
    console.log(arrRoads.length)
})


btnGenerate.addEventListener('click', () => {
    async function callGenerate() {
        const cars = await getAllCars();
        await generateGarage(cars);
        maxPage = numberPages();
    }
   return callGenerate();

})

let pageCurrent = 1;
const garageQuery = document.querySelector('.garage');

btnNext.addEventListener('click', () => {
    if (pageCurrent >= maxPage) {
        return
    }
    pageCurrent += 1;
    garageQuery.innerHTML = '';
    fillCurrentPage(pageCurrent);
})

btnPrev.addEventListener('click', () => {
    if (pageCurrent <= 1) {
        return;
    }
    pageCurrent -= 1;
    garageQuery.innerHTML = '';
    fillCurrentPage(pageCurrent);
})



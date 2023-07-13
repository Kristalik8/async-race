import {createCar, getAllCars, getCurrentGarage} from "./api/api";
import {additionData, generateGarage} from "./utils/createRoad";

import {counterMaxPage, page, carID} from "./utils/counting";
import {generateRandomCars} from "./utils/generateCars";
import {fillCurrentPage} from "./view/fillPage";

const btnCreate = document.getElementById('btn-create');
const btnUpdate = document.getElementById('btn-update');
const btnGenerate = document.getElementById("btn-generate");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");

btnCreate.addEventListener('click', () => {
    let getColorCar = (<HTMLInputElement>document.getElementById('colorCar')).value;
    let getNameCar = (<HTMLInputElement>document.getElementById('nameCar')).value;
    additionData(getNameCar, getColorCar, 'q');
    counterMaxPage()();
    console.log(typeof getColorCar)

    async function callCreateCar() {
        return await createCar({name: getNameCar, color: getColorCar});
    }

    callCreateCar().catch((error) => {
        throw new Error(`${error}`)
    });
})


let updNameCar = (<HTMLInputElement>document.getElementById('updNameCar'))

export function clickRoad() {
    const roadsQuery = document.querySelector('.garage');
    const roadsQueryAll = roadsQuery.querySelectorAll('.road');
    roadsQueryAll.forEach((roadQuery, i) => {
        roadQuery.addEventListener('click', () => {
            const carModel = roadQuery.querySelector('.car__model')
            carID.setId = Number(String(roadQuery.id).split('-')[1]);
            updNameCar.value = carModel.textContent;
        })
    })

}


btnGenerate.addEventListener('click', async () => {
    const carsRandom = generateRandomCars();

        for (let i = 0; i < carsRandom.length; i++) {
            await createCar({name: carsRandom[i].name, color: carsRandom[i].color});
            const cars = await getAllCars();
            await generateGarage(cars);
        }

        await counterMaxPage()();


})


btnNext.addEventListener('click', async () => {
    const maxPagePromise = counterMaxPage()();
    if (page.number >= await maxPagePromise) {
        return
    }
    page.number += 1;
    await fillCurrentPage();

})

btnPrev.addEventListener('click', async () => {
    if (page.number <= 1) {
        return;
    }
    page.number -= 1;
    await fillCurrentPage();
})




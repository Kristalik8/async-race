import {createCar, updateCar} from "./api/api";
import {additionData} from "./utils/createRoad";
import {counterMaxPage, index, page} from "./utils/counting";
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
    additionData(getNameCar, getColorCar);
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
let updColorCar = (<HTMLInputElement>document.getElementById('updColorCar'))

btnUpdate.addEventListener('click', () => {
    if (index.current === -1) {
        return;
    }
    const roadsQueryAll = document.querySelectorAll('.road');
    let id = (index.current + 1) + 7 * (page.number - 1)
    const modelCarQuery = roadsQueryAll[index.current].querySelector('.car__model');
    const svgCarQuery = roadsQueryAll[index.current].querySelector('.car svg g');

    modelCarQuery.innerHTML = updNameCar.value;
    svgCarQuery.setAttribute("fill", updColorCar.value);
    updateCar(id, {name: updNameCar.value, color: updColorCar.value}).catch((err) => console.log(err));
    updColorCar.value = "#000000";
    updNameCar.value = '';
    index.current = -1;
})

export function clickRoad() {
    const roadsQuery = document.querySelector('.garage');
    const roadsQueryAll = roadsQuery.querySelectorAll('.road');
    roadsQueryAll.forEach((roadQuery, i) => {
        roadQuery.addEventListener('click', () => {
            const carModel = roadQuery.querySelector('.car__model');
            index.current = i;
            const svgCarQuery = roadQuery.querySelector('.car svg g');
            updColorCar.value = svgCarQuery.getAttribute("fill");
            updNameCar.value = carModel.textContent;
        })
    })

}


btnGenerate.addEventListener('click', async () => {
    const carsRandom = generateRandomCars();

    for (let i = 0; i < carsRandom.length; i++) {
        await createCar({name: carsRandom[i].name, color: carsRandom[i].color});
        await additionData(carsRandom[i].name, carsRandom[i].color)
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




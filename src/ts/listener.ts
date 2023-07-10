const btnCreate = document.getElementById('btn-create');
const btnUpdate = document.getElementById('btn-update');
import {garage, createCar} from "./api";
import {createRoad} from "./createRoad";
document.getElementById('create').addEventListener('submit', async (e) => {
    e.preventDefault();
})

btnCreate.addEventListener('click', (e) => {
    e.preventDefault();
    let colorCar = (<HTMLInputElement>document.getElementById('colorCar')).value;
    let nameCar = (<HTMLInputElement>document.getElementById('nameCar')).value;
    const call = async () => await createCar({name: nameCar, color: colorCar});
    createRoad(nameCar, colorCar)
    return call();
})
btnUpdate.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(garage);
})


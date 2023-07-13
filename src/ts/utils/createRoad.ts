import {createCarImage} from "./carSVG";
import {ICar} from "../types";


const createRoad = (name: string, color: string, id:string): HTMLLIElement => {
    const roadElement = document.createElement('li');
    roadElement.className = 'road';
    roadElement.setAttribute('id', `road-${id}`);
    roadElement.innerHTML = ` <div class="car__control">
            <button class="button btn-select">Select</button>
            <button class="button btn-remove">Remove</button>
            <span class="car__model">${name}</span>
          </div>
          <div class="race">
            <div class="control-panel">
              <button type="button" class="button btn-start">Start</button>
              <button type="button" class="button btn-stop" disabled>Stop</button>
            </div>
              <div class="car">
                 ${createCarImage(color)}
              </div>
              <div class="flag">
              </div>
            </div>`;
    return roadElement;
}


function additionData(name: string, color: string, id:string) {
    const garage = document.querySelector('.garage');
    const roadsAmount = document.querySelectorAll('.road').length;
    if (roadsAmount < 7) {
        const road = createRoad(name, color, id);
        garage.append(road);
    }

}

const generateGarage = (arrItems: ICar[]) => {
    for (let i = 0; i < arrItems.length; i++) {
        additionData(arrItems[i].name, arrItems[i].color, arrItems[i].id);
    }
}


export {createRoad, generateGarage, additionData}

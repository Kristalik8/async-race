import {createCarImage} from "./carSVG";
import {ICar} from "../types";


const createRoad = (name: string, color: string): HTMLLIElement => {
    const roadElement = document.createElement('li');
    roadElement.className = 'road';
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


function additionData(name: string, color: string) {
    const garageQuery = document.querySelector('.garage');
    const roadsQuery = document.querySelectorAll('.road');
    const roadsAmount = roadsQuery.length;
    if (roadsAmount < 7) {
        const road = createRoad(name, color);
        garageQuery.append(road);
    }

}

const generateGarage = (arrItems: ICar[]) => {
    for (let i = 0; i < arrItems.length; i++) {
        if (i > 7) {
            return
        }
        additionData(arrItems[i].name, arrItems[i].color);
    }
}


export {createRoad, generateGarage, additionData}

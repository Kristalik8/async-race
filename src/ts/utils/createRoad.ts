import {createCarImage} from "./carSVG";
import {garage, getGarage} from "../api/api";
import {ICar} from "../types";

let arrRoads: Element[] = [];

const createRoad = (name: string, color: string): HTMLLIElement => {
    const roadElement = document.createElement('li');
    roadElement.className = 'road';
  const roadString = ` <div class="car__control">
            <button class="button btn-select">Select</button>
            <button class="button btn-remove">Remove</button>
            <span class="title car__model">${name}</span>
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

    roadElement.innerHTML = roadString;
    arrRoads.push(roadElement);
    return roadElement;
}


function additionData(name:string, color:string) {
    const garage = document.querySelector('.garage');
    const roadsAmount = garage.querySelectorAll('.road').length;
    const road = createRoad(name, color);
    if (roadsAmount < 7) {
        garage.append(road);
    }

}

const generateGarage = (arrItems: ICar[]) => {
    for (let i = 0; i < arrItems.length; i++) {
        additionData(arrItems[i].name, arrItems[i].color);
    }
}



export {createRoad, generateGarage, additionData, arrRoads}

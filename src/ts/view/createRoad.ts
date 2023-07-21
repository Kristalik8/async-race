import { createCarImage } from '../utils/carSVG';
import { ICar } from '../types';

const createRoad = (name: string, color: string, id: string): HTMLLIElement => {
  const roadElement = document.createElement('li');
  roadElement.className = 'road';
  roadElement.id = `road-${id}`;
  roadElement.innerHTML = `
       <div class="car__control">
            <button class="button btn-select">Select</button>
            <button class="button btn-remove">Remove</button>
            <span class="car__name">${name}</span>
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
};

function additionData(name: string, color: string, id: string) {
  const garageQuery = document.querySelector('.garage');
  const road = createRoad(name, color, id);
  garageQuery.append(road);
}

const generateGarage = (arrItems: ICar[]) => {
  const garageQuery = document.querySelector('.garage');
  for (let i = 0; i < arrItems.length; i += 1) {
    // additionData(arrItems[i].name, arrItems[i].color, arrItems[i].id);
    const road = createRoad(arrItems[i].name, arrItems[i].color, arrItems[i].id);
    garageQuery.append(road);
  }
};

export { createRoad, generateGarage, additionData };

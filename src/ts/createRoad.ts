import {createCarImage} from "./carSVG";


export const createRoad = (name: string, color:string) => {
    const garage = document.querySelector('.garage');
    const road = `<li class="road">
          <div class="car__control">
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
            </div>
        </li>`;

    garage.insertAdjacentHTML('beforeend', road);

}

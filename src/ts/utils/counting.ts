import {arrRoads} from "./createRoad";

const getPages = (): number => {
    const count = arrRoads.length;
    return Math.ceil(count/7);
}

export function counterMaxPage() {
    let maxPage:number = 1;

    return() => {
       maxPage = getPages();
       return  maxPage;
    }

}


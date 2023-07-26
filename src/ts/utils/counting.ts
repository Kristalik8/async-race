import { getPages} from '../api/api';
import { IObjResults, ResultsNumber, Winners } from '../types';

function counterMaxPage() {
  let maxPage = 1;

  return async () => {
    maxPage = await getPages();
    return maxPage;
  };
}

const page = {
  pageNumber: 1,

  get number() {
    return this.pageNumber;
  },
  set number(value) {
    this.pageNumber = value;
  },
};

const animation: IObjResults = {};

const containerTimesRace: ResultsNumber = {};

const clickRace = {
  click: false,
  get bool() {
    return this.click;
  },
  set bool(value) {
    this.click = value;
  },
};

const clickWinnerPage = {
  click: false,
  get bool() {
    return this.click;
  },
  set bool(value) {
    this.click = value;
  },
};

const winners: Winners = {
  pageNumber: 1,
  maxPage: 1,
  sortBy: '',
  sortOrder: '',
  get page() {
    return this.pageNumber;
  },
  set page(value) {
    this.pageNumber = value;
  },
};

const index = {
  indexNumber: -1,

  get current() {
    return this.indexNumber;
  },
  set current(value: number) {
    this.indexNumber = value;
  },
};

function carsCount(n: number): string {
  const carsAmountElem = document.getElementById('cars-amount');
  const numCarsNow = Number(carsAmountElem.textContent);
  const newNumCars = numCarsNow + n;
  return (carsAmountElem.innerHTML = String(newNumCars));
}


export { page, counterMaxPage, index, carsCount, winners, animation, clickRace, clickWinnerPage, containerTimesRace };

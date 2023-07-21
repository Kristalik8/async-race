import { getPages } from '../api/api';
import {Winners} from "../types";
function counterMaxPage() {
  let maxPage = 1;

  return async () => {
    maxPage = await getPages();
    return maxPage;
  };
}

const clickRace = {
  click: false,
  get bool() {
    return this.click;
  },
  set bool(value) {
    this.click = value;
  }
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

const winners: Winners = {
  pageNumber: 1,
  count: 0,
  sortBy: '',
  sortOrder: '',
  save: [],
  race: {},
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
  const carsAmountQuery = document.getElementById('cars-amount');
  const numCarsNow = Number(carsAmountQuery.textContent);
  const newNumCars = numCarsNow + n;
  return (carsAmountQuery.innerHTML = String(newNumCars));
}

export { page, counterMaxPage, index, carsCount, winners, clickRace };

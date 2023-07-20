import { getPages } from '../api/api';

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

export { page, counterMaxPage, index, carsCount };

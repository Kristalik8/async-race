import { winners, clickWinnerPage } from '../utils/counting';
import { fillCurrentWinners } from '../view/fillWinners';

const btnToGarage = <HTMLButtonElement>document.getElementById('btn-to-garage');
const btnToWinners = <HTMLButtonElement>document.getElementById('btn-to-winners');
const mainQuery = document.querySelector('.main');
const winnersQuery = document.querySelector('.winners');
const tbody = document.querySelector('table tbody');
const sortWins = document.getElementById('sort-wins');
const sortTime = document.getElementById('sort-time');

btnToGarage.addEventListener('click', () => {
  clickWinnerPage.bool = false;
  btnToWinners.disabled = false;
  btnToGarage.disabled = true;
  mainQuery.classList.remove('hidden');
  winnersQuery.classList.add('hidden');
  tbody.innerHTML = '';
});

const setSortCars = () => {
  winners.sortOrder = winners.sortOrder === 'asc' ? 'desc' : 'asc';
};

sortWins.onclick = async () => {
  winners.sortBy = 'wins';
  setSortCars();
  await fillCurrentWinners();
};

sortTime.onclick = async () => {
  winners.sortBy = 'time';
  setSortCars();
  await fillCurrentWinners();
};

document.getElementById('btn-winners-next').onclick = async () => {
  if (winners.page >= winners.maxPage) {
    return;
  }
  winners.page += 1;
  clickWinnerPage.bool = true;
  await fillCurrentWinners();
};

document.getElementById('btn-winners-prev').onclick = async () => {
  if (winners.page <= 1) {
    return;
  }
  winners.page -= 1;
  clickWinnerPage.bool = true;
  await fillCurrentWinners();
};

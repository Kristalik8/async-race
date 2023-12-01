import { getCurrentWinners, getAllWinners } from '../api/api';
import { createCarImage } from '../utils/carSVG';
import { winners, clickWinnerPage } from '../utils/counting';

const winnersPageElem = document.querySelector('.winners__page-num');

export async function fillCurrentWinners() {
  winnersPageElem.textContent = `${winners.page}`;
  const tbody = document.querySelector('table tbody');
  tbody.innerHTML = '';
  const { items, count } = await getCurrentWinners(winners.page, winners.sortBy, winners.sortOrder);
  const carsAmountQuery = document.querySelector('.winners__amount');
  carsAmountQuery.innerHTML = String(count);

  const trElems = `${items
    .map(
      (winner, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${createCarImage(winner.car.color)}</td>
          <td>${winner.car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
        </tr>
        `
    )
    .join(' ')}`;
  tbody.insertAdjacentHTML('beforeend', trElems);
  if (!clickWinnerPage.bool) {
    const allWinners = await getAllWinners();
    winners.maxPage = Math.ceil(allWinners.length / 10);
  }
}

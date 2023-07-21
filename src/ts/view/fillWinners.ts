import { getWinners } from '../api/api';
import { createCarImage } from '../utils/carSVG';
import { winners } from '../utils/counting';

export async function fillCurrentWinners() {
  const tbody = document.querySelector('table tbody');
  tbody.innerHTML = '';
  const { items, count } = await getWinners(winners.page, winners.sortBy, winners.sortOrder);
  console.log(items)
  winners.count = count;
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
}

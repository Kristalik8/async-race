import { createWinner, getAllWinners, updateWinner } from '../api/api';
import { containerTimesRace } from '../utils/counting';

export async function addWinner(id: number, roadElement: Element) {
  const timeWin = containerTimesRace[id];
  const messageWinner = document.querySelector('.message-winner');
  const carName = roadElement.querySelector('.car__name').textContent;
  messageWinner.classList.remove('hidden');
  messageWinner.innerHTML = `${carName} went first in ${timeWin}s`;
  const allWinners = await getAllWinners();
  let foundId = false;
  allWinners.forEach((item) => {
    if (id === item.id) {
      foundId = true;
      const newContWins = item.wins + 1;
      const bestTime = timeWin < item.time ? timeWin : item.time;
      updateWinner(id, { wins: newContWins, time: bestTime });
    }
  });
  if (!foundId) {
    await createWinner({ id: id, wins: 1, time: timeWin });
  }
}

import { createWinner, getAllWinners, updateWinner } from '../api/api';

export async function addWinner(timeStart: number, id: number, roadElement: Element) {
  const messageWinner = document.querySelector('.message-winner');
  const carName = roadElement.querySelector('.car__name').textContent;
  const timeEnd = new Date().getTime();
  const timeFirstWin = Number(((timeEnd - timeStart) / 1000).toFixed(2));
  messageWinner.classList.remove('hidden');
  messageWinner.innerHTML = `${carName} went first in ${timeFirstWin}s`;
  const allWinners = await getAllWinners();
  let foundId = false;
  allWinners.forEach((item) => {
    if (id === item.id) {
      foundId = true;
      const newContWins = item.wins + 1;
      const bestTime = timeFirstWin > item.time ? timeFirstWin : item.time;
      updateWinner(id, { wins: newContWins, time: bestTime });
    }
  });

  if (!foundId) {
    await createWinner({ id: id, wins: 1, time: timeFirstWin });
  }
}

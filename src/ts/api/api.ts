import { ICar, IWinnerItem, IWinner } from '../types';

const baseUrl = 'http://localhost:3000';
export const garage = `${baseUrl}/garage`;
const winners = `${baseUrl}/winners`;
const engine = `${baseUrl}/engine`;

const getAllCars = async (): Promise<ICar[]> => {
  const res = await fetch(`${garage}`);
  return res.json();
};

const getCurrentGarage = async (page: number): Promise<ICar[]> => {
  const res = await fetch(`${garage}?_page=${page}&_limit=7`);
  return res.json();
};

const getPages = async (): Promise<number> => {
  const res = await fetch(`${garage}?_limit=7`);
  const countHeaders = Number(res.headers.get('X-Total-Count'));
  return Math.ceil(countHeaders / 7);
};

const getCar = async (id: number): Promise<ICar> => (await fetch(`${garage}/${id}`)).json();

const deleteCar = async (id: number) =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'DELETE',
    })
  ).json();

const createCar = async (body: { name: string; color: string }) => {
  const response = await fetch(`${garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

const updateCar = async (id: number, body: { name: string; color: string }) => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

const velocityCar = async (id: number): Promise<number> => {
  const response = await fetch(`${engine}?id=${id}&status=started`, { method: 'PATCH' });
  const { velocity } = await response.json();
  return velocity;
};

const brokeEngine = async (id: number): Promise<boolean> => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return res.status === 500;
};

const winnersSort = (sort?: string, order?: string) => (sort && order ? `&_sort=${sort}&_order=${order}` : '');

const getAllWinners = async (): Promise<IWinner[]> => {
  const res = await fetch(`${winners}`);
  return res.json();
};

const getWinnersOnPage = async (
  page: number,
  sort?: string,
  order?: string
): Promise<{ items: IWinnerItem[]; count: number }> => {
  const res = await fetch(`${winners}?_page=${page}&_limit=10&${winnersSort(sort, order)}`);
  const items = await res.json();
  return {
    items: await Promise.all(items.map(async (winner: IWinnerItem) => ({ ...winner, car: await getCar(winner.id) }))),
    count: Number(res.headers.get('X-Total-Count')),
  };
};

const createWinner = async (body: IWinner) => {
  const response = await fetch(`${winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

const updateWinner = async (id: number, body: { wins: number; time: number }) => {
  const response = await fetch(`${winners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

const deleteWinner = async (id: number) =>
  (
    await fetch(`${winners}/${id}`, {
      method: 'DELETE',
    })
  ).json();

export const getWinner = async (id: number): Promise<IWinner> => (await fetch(`${winners}/${id}`)).json();

export {
  getCurrentGarage,
  createCar,
  getAllCars,
  updateCar,
  getPages,
  deleteCar,
  velocityCar,
  brokeEngine,
  createWinner,
  updateWinner,
  deleteWinner,
  getWinnersOnPage,
  getAllWinners,
};

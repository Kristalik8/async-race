import { ICar } from '../types';

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
  const res = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' });
  return res.status === 500;
};

export { getCurrentGarage, createCar, getAllCars, updateCar, getPages, deleteCar, velocityCar, brokeEngine };

import {ICar, IGarage} from "../types";

const baseUrl = 'http://localhost:3000';
export const garage = `${baseUrl}/garage`;
const winners = `${baseUrl}/winners`;
const engine = `${baseUrl}/engine`;

const getAllCars = async (): Promise<ICar[]> => {
    const res = await fetch(`${garage}`);
    const items = await res.json();
    return items;
};

// const getAllCars = async (): Promise<{items: ICar[]}> => {
//     const res = await fetch(`${garage}`);
//     return {
//         items: await res.json()
//     };
// };


const getGarage = async (): Promise<IGarage> => {
        const res = await fetch(`${garage}?_limit=7`);
      return {
        items: await res.json(),
        count: Number(res.headers.get('X-Total-Count')),
    };
};

// const getPage = async (): Promise<number> => {
//     const res = await fetch(`${garage}?_limit=7`);
//     const countHeaders = Number(res.headers.get('X-Total-Count'));
//     return Math.ceil(countHeaders/7);
// }

const getCar = async (id: number): Promise<ICar> => (await fetch(`${garage}/${id}`)).json();


const createCar = async (body: { name: string; color: string }) => {
    const response = await fetch(`${garage}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const car = await response.json();
    return car;
}



export {getGarage, createCar, getAllCars};

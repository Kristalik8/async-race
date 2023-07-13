import {ICar} from "../types";

const baseUrl = 'http://localhost:3000';
export const garage = `${baseUrl}/garage`;
const winners = `${baseUrl}/winners`;
const engine = `${baseUrl}/engine`;

const getAllCars = async (): Promise<ICar[]> => {
    const res = await fetch(`${garage}`);
    return await res.json();
};


const getCurrentGarage = async (page:number): Promise<ICar[]> => {
    const res = await fetch(`${garage}?_page=${page}&_limit=7`);
    return await res.json()
};

const getPages = async (): Promise<number> => {
    const res = await fetch(`${garage}?_limit=7`);
    const countHeaders = Number(res.headers.get('X-Total-Count'));
    return Math.ceil(countHeaders/7);
}

const getCar = async (id: number): Promise<ICar> => (await fetch(`${garage}/${id}`)).json();


const createCar = async (body: { name: string; color: string }) => {
    const response = await fetch(`${garage}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return await response.json();
}


const updateCar = async (id: number, body: { name: string; color: string }) => {
    const response = await fetch(`${garage}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    return await response.json();
}



export {getCurrentGarage , createCar, getAllCars, updateCar, getPages};

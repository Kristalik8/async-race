import './index.scss'
import './ts/dataCars'
const baseUrl = 'http://localhost:3000';
const garage = `${baseUrl}/garage`;
const winners = `${baseUrl}/winners`;
const engine = `${baseUrl}/engine`;
console.log(engine)
const garageSelector = document.querySelector('.garage')
export interface ICar {
    name: string;
    color: string;
    id: number;
}
export interface IGarage {
    items: ICar[];
    count: number;
}

const getGarage = async (page: number): Promise<IGarage> => {
    const res = await fetch(`${garage}?_page=${page}&_limit=7`);
    return {
        items: await res.json(),
        count: Number(res.headers.get('X-Total-Count')),
    };
};

const getCar = async (id: number): Promise<ICar> => (await fetch(`${garage}/${id}`)).json();




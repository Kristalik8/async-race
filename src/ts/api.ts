const baseUrl = 'http://localhost:3000';
export const garage = `${baseUrl}/garage`;
const winners = `${baseUrl}/winners`;
const engine = `${baseUrl}/engine`;


interface ICar {
    name: string;
    color: string;
    id: number;
}
interface IGarage {
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

const createCar = async (body: { name: string; color: string }) =>
    (
        await fetch(`${garage}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
    ).json();

export {createCar};

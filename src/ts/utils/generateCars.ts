import {brands, models} from "./dataCars";


const randomName = () => {
    const model = models[Math.floor(Math.random() * models.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    return `${brand} ${model}`;
};
const randomColor = () => {
    const symbols = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += symbols[Math.floor(Math.random() * 16)];
    }
    return color;
};



export const generateRandomCars = (countCars = 100):{ name: string; color: string; }[] =>
    new Array(countCars).fill(0).map(() => ({ name: randomName(), color: randomColor() }));



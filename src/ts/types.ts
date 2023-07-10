interface ICar {
    name: string;
    color: string;
    id: number;
}
interface IGarage {
    items: ICar[];
    count: number;
}

export {ICar, IGarage}

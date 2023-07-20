interface ICar {
  name: string;
  color: string;
  id: string;
}
interface IGarage {
  items: ICar[];
  count: number;
}

export { ICar, IGarage };

interface ICar {
  name: string;
  color: string;
  id: string;
}
interface IGarage {
  items: ICar[];
  count: number;
}

interface IWinnerItem {
  id: number;
  wins: number;
  time: number;
  car: ICar;
}

export { ICar, IGarage, IWinnerItem };

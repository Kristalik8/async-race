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

interface Results {
  [id: number]: number;
}

interface Winners {
  pageNumber: number;
  count: number;
  sortBy: string;
  sortOrder: string;
  save: object[];
  race: Results;
  page: number;
}


export { ICar, IGarage, IWinnerItem, Results, Winners };

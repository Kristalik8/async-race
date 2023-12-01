interface ICar {
  name: string;
  color: string;
  id: string;
}

interface IWinnerItem {
  id: number;
  wins: number;
  time: number;
  car: ICar;
}

interface ResultsNumber {
  [id: string]: number;
}

interface ResultsBoolean {
  [id: number]: boolean;
}

interface IObjResults {
  [id: number]: ResultsNumber;
}

interface Winners {
  pageNumber: number;
  maxPage: number;
  sortBy: string;
  sortOrder: string;
  page: number;
}

interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export { ICar, ResultsBoolean, IWinnerItem, ResultsNumber, Winners, IObjResults, IWinner };

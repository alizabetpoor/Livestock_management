export interface BreedResponseType {
  count: number;
  next: string;
  previous: string;
  results: BreedType[];
}

export interface BreedType {
  id: number;
  name: string;
  origin: string;
  characteristics: string;
  average_weight: string;
  life_expectancy: number;
  color: string;
}

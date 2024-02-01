import { CattleType } from './cattle';

export interface BreedingRecordResponseType {
  count: number;
  next: string;
  previous: string;
  results: BreedingRecordType[];
}

export interface BreedingRecordType {
  bull: CattleType;
  cow: CattleType;
  breeding_date: string;
  expected_calving_date: string;
  actual_calving_date: string;
  breeding_method: string;
  notes: string;
}

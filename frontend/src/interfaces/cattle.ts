import { BreedType } from './breed';
import { OwnerType } from './owner';

export interface CattlesResponseType {
  count: number;
  next: string;
  previous: string;
  results: CattleType[];
}

export interface CattleType {
  id: number;
  gender_display: string;
  ear_tag_number: string;
  name: string;
  gender: string;
  date_of_birth: string;
  weight: string;
  height: string;
  photo: string;
  microchip_id: string;
  price: string;
  created: string;
  updated: string;
  breed: BreedType;
  sire: any;
  dam: any;
  owner: OwnerType;
}

import { CattleType } from './cattle';

export interface HealthRecordsResponseType {
  count: number;
  next: string;
  previous: string;
  results: HealthRecordType[];
}

export interface HealthRecordType {
  id: number;
  checkup_date: string;
  health_notes: string;
  vaccinations: string;
  treatments: string;
  diagnosis: string;
  veterinarian: string;
  cattle: CattleType;
}

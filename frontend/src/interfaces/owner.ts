export interface OwnerResponseType {
  count: number;
  next: string;
  previous: string;
  results: OwnerType[];
}

export interface OwnerType {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  address: string;
  company_name: string;
  website: string;
  profile_picture: string;
  created: string;
  updated: string;
}

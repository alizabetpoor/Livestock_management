import { AxiosResponse } from 'axios';
import api from './api';
import { CattlesResponseType } from '../interfaces/cattle';

const getCattles = (page: number = 1) => {
  return api.get<CattlesResponseType>(`/cattle/?page=${page}`);
};

const deleteCattle = (id: number) => {
  return api.delete(`/cattle/${id}`);
};

const getBreeds = () => {
  return api.get('/breeds');
};

const getBreedingRecords = () => {
  return api.get('/breeding_records');
};

const getHealthRecords = () => {
  return api.get('/health_records');
};
const getOwners = () => {
  return api.get('/owners');
};

const UserService = {
  getCattles,
  deleteCattle,
  getBreeds,
  getBreedingRecords,
  getHealthRecords,
  getOwners,
};

export default UserService;

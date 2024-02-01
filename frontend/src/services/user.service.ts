import api from './api';
import { CattleType, CattlesResponseType } from '../interfaces/cattle';
import { BreedResponseType, BreedType } from '../interfaces/breed';
import { OwnerResponseType, OwnerType } from '../interfaces/owner';
import {
  HealthRecordType,
  HealthRecordsResponseType,
} from '../interfaces/healthRecord';
import {
  BreedingRecordResponseType,
  BreedingRecordType,
} from '../interfaces/breedingRecord';

const getCattles = (page: number = 1) => {
  return api.get<CattlesResponseType>(`/cattle/?page=${page}`);
};

const getCattle = (id: number | string) => {
  return api.get<CattleType>(`/cattle/${id}`);
};

const deleteCattle = (id: number) => {
  return api.delete(`/cattle/${id}`);
};

const getBreeds = (page: number = 1) => {
  return api.get<BreedResponseType>(`/breeds/?page=${page}`);
};

const getBreed = (id: number | string) => {
  return api.get<BreedType>(`/breeds/${id}`);
};

const deleteBreed = (id: number) => {
  return api.delete(`/breeds/${id}`);
};

const getBreedingRecords = (page: number = 1) => {
  return api.get<BreedingRecordResponseType>(`/breeding_records/?page=${page}`);
};

const getBreedingRecord = (id: number | string) => {
  return api.get<BreedingRecordType>(`/breeding_records/${id}`);
};

const deleteBreedingRecord = (id: number) => {
  return api.delete(`/breeding_records/${id}`);
};

const getHealthRecords = (page: number = 1) => {
  return api.get<HealthRecordsResponseType>(`/health_records/?page=${page}`);
};

const getHealthRecord = (id: number | string) => {
  return api.get<HealthRecordType>(`/health_records/${id}`);
};

const deleteHealthRecord = (id: number) => {
  return api.delete(`/health_records/${id}`);
};

const getOwners = (page: number = 1) => {
  return api.get<OwnerResponseType>(`/owners/?page=${page}`);
};

const getOwner = (id: number | string) => {
  return api.get<OwnerType>(`/owners/${id}`);
};

const deleteOwner = (id: number) => {
  return api.delete(`/owner/${id}`);
};

const UserService = {
  getCattles,
  getCattle,
  deleteCattle,
  getBreeds,
  getBreed,
  deleteBreed,
  getBreedingRecords,
  deleteBreedingRecord,
  getHealthRecords,
  deleteHealthRecord,
  getOwners,
  deleteOwner,
  getBreedingRecord,
  getHealthRecord,
  getOwner,
};

export default UserService;

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

const getCattles = (page: number = 1, page_size: number = 20) => {
  return api.get<CattlesResponseType>(
    `/cattle/?page=${page}&page_size=${page_size}`,
  );
};

const createCattle = (body: any) => {
  return api.post<CattleType>(`/cattle/`, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const editCattle = (body: any, id: number | string) => {
  return api.patch<CattleType>(`/cattle/${id}/`, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const getCattle = (id: number | string) => {
  return api.get<CattleType>(`/cattle/${id}`);
};

const deleteCattle = (id: number) => {
  return api.delete(`/cattle/${id}`);
};

const getBreeds = (page: number = 1, page_size: number = 20) => {
  return api.get<BreedResponseType>(
    `/breeds/?page=${page}&page_size=${page_size}`,
  );
};

const getBreed = (id: number | string) => {
  return api.get<BreedType>(`/breeds/${id}`);
};

const createBreed = (body: any) => {
  return api.post<CattleType>(`/breeds/`, body);
};

const editBreed = (body: any, id: number | string) => {
  return api.patch<CattleType>(`/breeds/${id}/`, body);
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

const createBreedingRecord = (body: any) => {
  return api.post<BreedingRecordType>(`/breeding_records/`, body);
};

const editBreedingRecord = (body: any, id: number | string) => {
  return api.patch<BreedingRecordType>(`/breeding_records/${id}/`, body);
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

const createHealthRecord = (body: any) => {
  return api.post<HealthRecordType>(`/health_records/`, body);
};

const editHealthRecord = (body: any, id: number | string) => {
  return api.patch<HealthRecordType>(`/health_records/${id}/`, body);
};

const deleteHealthRecord = (id: number) => {
  return api.delete(`/health_records/${id}`);
};

const getOwners = (page: number = 1, page_size: number = 20) => {
  return api.get<OwnerResponseType>(
    `/owners/?page=${page}&page_size=${page_size}`,
  );
};

const getOwner = (id: number | string) => {
  return api.get<OwnerType>(`/owners/${id}`);
};

const createOwner = (body: any) => {
  return api.post<OwnerType>(`/owners/`, body);
};

const editOwner = (body: any, id: number | string) => {
  return api.patch<OwnerType>(`/owners/${id}/`, body);
};

const deleteOwner = (id: number) => {
  return api.delete(`/owner/${id}`);
};

const getCattlesInfo = () => {
  return api.get(`/cattles/info/`);
};

const getCattlesAgeGroups = () => {
  return api.get(`/cattles/age-groups/`);
};

const UserService = {
  getCattles,
  getCattle,
  createCattle,
  editCattle,
  deleteCattle,
  getBreeds,
  getBreed,
  createBreed,
  editBreed,
  deleteBreed,
  getBreedingRecords,
  getCattlesAgeGroups,
  deleteBreedingRecord,
  getHealthRecords,
  deleteHealthRecord,
  getOwners,
  deleteOwner,
  getBreedingRecord,
  createBreedingRecord,
  editBreedingRecord,
  getHealthRecord,
  createHealthRecord,
  editHealthRecord,
  getOwner,
  createOwner,
  editOwner,
  getCattlesInfo,
};

export default UserService;

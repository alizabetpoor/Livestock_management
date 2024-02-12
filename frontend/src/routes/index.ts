import { lazy } from 'react';

const CattleList = lazy(() => import('../pages/Cattle/List'));
const CattleNew = lazy(() => import('../pages/Cattle/New'));
const CattleView = lazy(() => import('../pages/Cattle/View'));
const CattleEdit = lazy(() => import('../pages/Cattle/Edit'));
const BreedList = lazy(() => import('../pages/Breed/List'));
const BreedView = lazy(() => import('../pages/Breed/View'));
const BreedNew = lazy(() => import('../pages/Breed/New'));
const BreedEdit = lazy(() => import('../pages/Breed/Edit'));
const OwnerList = lazy(() => import('../pages/Owner/List'));
const OwnerView = lazy(() => import('../pages/Owner/View'));
const OwnerNew = lazy(() => import('../pages/Owner/New'));
const OwnerEdit = lazy(() => import('../pages/Owner/Edit'));
const HealthRecordList = lazy(() => import('../pages/HealthRecord/List'));
const HealthRecordView = lazy(() => import('../pages/HealthRecord/View'));
const HealthRecordNew = lazy(() => import('../pages/HealthRecord/New'));
const HealthRecordEdit = lazy(() => import('../pages/HealthRecord/Edit'));
const BreedingRecordList = lazy(() => import('../pages/BreedingRecord/List'));
const BreedingRecordView = lazy(() => import('../pages/BreedingRecord/View'));
const BreedingRecordNew = lazy(() => import('../pages/BreedingRecord/New'));
const BreedingRecordEdit = lazy(() => import('../pages/BreedingRecord/Edit'));

const coreRoutes = [
  {
    path: '/cattle/list',
    title: 'گله',
    component: CattleList,
  },
  {
    path: '/cattle/new',
    title: 'ایجاد رکورد',
    component: CattleNew,
  },
  {
    path: '/cattle/view/:id',
    title: 'جزئیات گاو',
    component: CattleView,
  },
  {
    path: '/cattle/edit/:id',
    title: 'ویرایش گاو',
    component: CattleEdit,
  },
  {
    path: '/breed/list',
    title: 'نژاد',
    component: BreedList,
  },
  {
    path: '/breed/view/:id',
    title: 'جزئیات نژاد',
    component: BreedView,
  },
  {
    path: '/breed/edit/:id',
    title: 'ویرایش نژاد',
    component: BreedEdit,
  },
  {
    path: '/breed/new',
    title: 'ایجاد رکورد',
    component: BreedNew,
  },
  {
    path: '/owner/list',
    title: 'صاحب',
    component: OwnerList,
  },
  {
    path: '/owner/view/:id',
    title: 'جزئیات صاحب',
    component: OwnerView,
  },
  {
    path: '/owner/edit/:id',
    title: 'ویرایش صاحب',
    component: OwnerEdit,
  },
  {
    path: '/owner/new',
    title: 'ایجاد رکورد',
    component: OwnerNew,
  },
  {
    path: '/healthRecord/list',
    title: 'وضعیت سلامتی',
    component: HealthRecordList,
  },
  {
    path: '/healthRecord/view/:id',
    title: 'جزئیات وضعیت سلامتی',
    component: HealthRecordView,
  },
  {
    path: '/healthRecord/edit/:id',
    title: 'ویرایش وضعیت سلامتی',
    component: HealthRecordEdit,
  },
  {
    path: '/healthRecord/new',
    title: 'ایجاد رکورد',
    component: HealthRecordNew,
  },
  {
    path: '/breedingRecord/list',
    title: 'سوابق پرورش',
    component: BreedingRecordList,
  },
  {
    path: '/breedingRecord/view/:id',
    title: 'جزئیات سوابق پرورش',
    component: BreedingRecordView,
  },
  {
    path: '/breedingRecord/edit/:id',
    title: 'ویرایش سوابق پرورش',
    component: BreedingRecordEdit,
  },
  {
    path: '/breedingRecord/new',
    title: 'ایجاد رکورد',
    component: BreedingRecordNew,
  },
];

const routes = [...coreRoutes];
export default routes;

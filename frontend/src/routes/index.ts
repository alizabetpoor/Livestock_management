import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const CattleList = lazy(() => import('../pages/Cattle/List'));
const CattleView = lazy(() => import('../pages/Cattle/View'));
const BreedList = lazy(() => import('../pages/Breed/List'));
const BreedView = lazy(() => import('../pages/Breed/View'));
const OwnerList = lazy(() => import('../pages/Owner/List'));
const OwnerView = lazy(() => import('../pages/Owner/View'));
const HealthRecordList = lazy(() => import('../pages/HealthRecord/List'));
const HealthRecordView = lazy(() => import('../pages/HealthRecord/View'));
const BreedingRecordList = lazy(() => import('../pages/BreedingRecord/List'));
const BreedingRecordView = lazy(() => import('../pages/BreedingRecord/View'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/cattle/list',
    title: 'گله',
    component: CattleList,
  },
  {
    path: '/cattle/new',
    title: 'ایجاد رکورد',
    component: CattleList,
  },
  {
    path: '/cattle/view/:id',
    title: 'جزئیات گاو',
    component: CattleView,
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
    path: '/breed/new',
    title: 'ایجاد رکورد',
    component: BreedList,
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
    path: '/owner/new',
    title: 'ایجاد رکورد',
    component: OwnerList,
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
    path: '/healthRecord/new',
    title: 'ایجاد رکورد',
    component: HealthRecordList,
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
    path: '/breedingRecord/new',
    title: 'ایجاد رکورد',
    component: BreedingRecordList,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;

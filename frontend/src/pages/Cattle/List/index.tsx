import Breadcrumb from '../../../components/Breadcrumb';
import Table from '../../../common/Table';
import UserService from '../../../services/user.service';
import { useEffect, useState } from 'react';
import Loader from '../../../common/Loader';
import { CattleType } from '../../../interfaces/cattle';
import { PaginationType } from '../../../interfaces/pagination';

interface tableDataType {
  [key: string]: string;
}

const mockData: tableDataType[] = [
  {
    ear_tag_number: '#4213232141442',
    name: 'wtrws',
    breed: 'آلمانی',
    gender: 'مذکر',
    date_of_birth: '1401/10/02',
  },
  {
    ear_tag_number: '#4213423142312',
    name: 'fafw',
    breed: 'ایرانی',
    gender: 'مونث',
    date_of_birth: '1400/05/12',
  },
  {
    ear_tag_number: '#521323213124',
    name: 'gfavc',
    breed: 'گرینویچ',
    gender: 'مذکر',
    date_of_birth: '1401/02/27',
  },
];

const headersName = ['آیدی ایرتگ', 'نام', 'نژاد', 'تاریخ تولد', 'جنسیت'];
const columnsName = [
  'ear_tag_number',
  'name',
  'breed.name',
  'date_of_birth',
  'gender_display',
];

const CattleList = () => {
  const [cattleData, setCattleData] = useState<null | CattleType[]>(null);
  const [paginationData, setPaginationData] = useState<null | PaginationType>(
    null,
  );

  const getCattlesData = (page: number = 1) => {
    UserService.getCattles(page)
      .then((response) => {
        setCattleData(response.data.results);
        setPaginationData({
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCattlesData();
  }, []);
  return (
    <>
      <Breadcrumb pageName="لیست گاو ها" />

      <div className="flex flex-col gap-10">
        {cattleData ? (
          <Table
            columnsName={columnsName}
            data={cattleData as any}
            headersName={headersName}
            deleteService={UserService.deleteCattle}
            getService={getCattlesData}
            entityName="cattle"
            paginationData={paginationData}
          />
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default CattleList;

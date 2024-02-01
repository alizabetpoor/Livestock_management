import Breadcrumb from '../../../components/Breadcrumb';
import Table from '../../../common/Table';
import UserService from '../../../services/user.service';
import { useEffect, useState } from 'react';
import Loader from '../../../common/Loader';
import { PaginationType } from '../../../interfaces/pagination';
import { BreedingRecordType } from '../../../interfaces/breedingRecord';

const headersName = [
  'آیدی',
  'تاریخ پرورش',
  'تاریخ زایمان مورد انتظار',
  'تاریخ زایمان واقعی',
  'پدر',
  'مادر',
];
const columnsName = [
  'id',
  'breeding_date',
  'expected_calving_date',
  'actual_calving_date',
  'bull.ear_tag_number',
  'cow.ear_tag_number',
];

const BreedingRecordList = () => {
  const [breedingRecordsData, setBreedingRecordsData] = useState<
    null | BreedingRecordType[]
  >(null);
  const [paginationData, setPaginationData] = useState<null | PaginationType>(
    null,
  );

  const getBreedingRecordsData = (page: number = 1) => {
    UserService.getBreedingRecords(page)
      .then((response) => {
        setBreedingRecordsData(response.data.results);
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
    getBreedingRecordsData();
  }, []);
  return (
    <>
      <Breadcrumb pageName="لیست سوابق پرورش" />

      <div className="flex flex-col gap-10">
        {breedingRecordsData ? (
          <Table
            columnsName={columnsName}
            data={breedingRecordsData as any}
            headersName={headersName}
            deleteService={UserService.deleteBreedingRecord}
            getService={getBreedingRecordsData}
            entityName="breedingRecord"
            paginationData={paginationData}
          />
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default BreedingRecordList;

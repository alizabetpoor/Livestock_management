import Breadcrumb from '../../../components/Breadcrumb';
import Table from '../../../common/Table';
import UserService from '../../../services/user.service';
import { useEffect, useState } from 'react';
import Loader from '../../../common/Loader';
import { PaginationType } from '../../../interfaces/pagination';
import { HealthRecordType } from '../../../interfaces/healthRecord';

const headersName = ['آیدی', 'گاو', 'تاریخ چک', 'یادداشت', 'دامپزشک'];
const columnsName = [
  'id',
  'cattle.ear_tag_number',
  'checkup_date',
  'health_notes',
  'veterinarian',
];

const HealthRecordList = () => {
  const [healthRecordsData, setHealthRecordsData] = useState<
    null | HealthRecordType[]
  >(null);
  const [paginationData, setPaginationData] = useState<null | PaginationType>(
    null,
  );

  const getHealthRecordsData = (page: number = 1) => {
    UserService.getHealthRecords(page)
      .then((response) => {
        setHealthRecordsData(response.data.results);
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
    getHealthRecordsData();
  }, []);
  return (
    <>
      <Breadcrumb pageName="لیست وضعیت سلامتی" />

      <div className="flex flex-col gap-10">
        {healthRecordsData ? (
          <Table
            columnsName={columnsName}
            data={healthRecordsData as any}
            headersName={headersName}
            deleteService={UserService.deleteHealthRecord}
            getService={getHealthRecordsData}
            entityName="healthRecord"
            paginationData={paginationData}
          />
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default HealthRecordList;

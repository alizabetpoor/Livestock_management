import Breadcrumb from '../../../components/Breadcrumb';
import Table from '../../../common/Table';
import UserService from '../../../services/user.service';
import { useEffect, useState } from 'react';
import Loader from '../../../common/Loader';
import { PaginationType } from '../../../interfaces/pagination';
import { OwnerType } from '../../../interfaces/owner';

const headersName = [
  'آیدی',
  'نام کوچک',
  'نام خانوادگی',
  'شماره موبایل',
  'ایمیل',
  'آدرس',
];
const columnsName = [
  'id',
  'first_name',
  'last_name',
  'phone_number',
  'email',
  'address',
];

const OwnerList = () => {
  const [ownersData, setOwnersData] = useState<null | OwnerType[]>(null);
  const [paginationData, setPaginationData] = useState<null | PaginationType>(
    null,
  );

  const getOwnersData = (page: number = 1) => {
    UserService.getOwners(page)
      .then((response) => {
        setOwnersData(response.data.results);
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
    getOwnersData();
  }, []);
  return (
    <>
      <Breadcrumb pageName="لیست صاحب ها" />

      <div className="flex flex-col gap-10">
        {ownersData ? (
          <Table
            columnsName={columnsName}
            data={ownersData as any}
            headersName={headersName}
            deleteService={UserService.deleteOwner}
            getService={getOwnersData}
            entityName="owner"
            paginationData={paginationData}
          />
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default OwnerList;

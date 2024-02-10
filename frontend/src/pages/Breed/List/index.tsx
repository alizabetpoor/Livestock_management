import Breadcrumb from '../../../components/Breadcrumb';
import Table from '../../../common/Table';
import UserService from '../../../services/user.service';
import { useEffect, useState } from 'react';
import Loader from '../../../common/Loader';
import { PaginationType } from '../../../interfaces/pagination';
import { BreedType } from '../../../interfaces/breed';

const headersName = ['آیدی', 'نام', 'مبداً', 'ویژگی'];
const columnsName = ['id', 'name', 'origin', 'characteristics'];

const BreedList = () => {
  const [breedData, setBreedData] = useState<null | BreedType[]>(null);
  const [paginationData, setPaginationData] = useState<null | PaginationType>(
    null,
  );

  const getBreedsData = (page: number = 1) => {
    UserService.getBreeds(page)
      .then((response) => {
        setBreedData(response.data.results);
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
    getBreedsData();
  }, []);
  return (
    <>
      <Breadcrumb pageName="لیست نژاد ها" />

      <div className="flex flex-col gap-10">
        {breedData ? (
          <Table
            columnsName={columnsName}
            data={breedData as any}
            headersName={headersName}
            deleteService={UserService.deleteBreed}
            getService={getBreedsData}
            entityName="breed"
            paginationData={paginationData}
          />
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default BreedList;

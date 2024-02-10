import { useEffect, useState } from 'react';
import UserService from '../../../services/user.service';
import { useParams } from 'react-router-dom';
import { CattleType } from '../../../interfaces/cattle';
import BreedingRecordTable from '../../../components/Table/BreedingRecordTable';

interface tableDataType {
  [key: string]: string;
}

const BreedingRecordEdit = () => {
  let { id } = useParams();
  const [breedingRecordData, setBreedingRecordData] =
    useState<null | tableDataType>(null);
  const [cattles, setCattles] = useState<null | CattleType[]>(null);

  useEffect(() => {
    UserService.getCattles(1, 1000)
      .then((response) => {
        setCattles(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

    if (id) {
      UserService.getBreedingRecord(id)
        .then((response) => {
          let cloneResponse = { ...response.data };
          cloneResponse = {
            ...cloneResponse,
            bull: cloneResponse.bull.id as any,
            cow: cloneResponse.cow.id as any,
          };
          setBreedingRecordData(cloneResponse as any);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return cattles && breedingRecordData ? (
    <BreedingRecordTable
      defaultValues={breedingRecordData}
      cattles={cattles}
      edit={true}
    />
  ) : null;
};

export default BreedingRecordEdit;

import { useEffect, useState } from 'react';
import UserService from '../../../services/user.service';
import { useParams } from 'react-router-dom';
import { CattleType } from '../../../interfaces/cattle';
import HealthRecordTable from '../../../components/Table/HealthRecordTable';

interface tableDataType {
  [key: string]: string;
}
const HealthRecordEdit = () => {
  let { id } = useParams();
  const [healthRecordData, setHealthRecordData] =
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
      UserService.getHealthRecord(id)
        .then((response) => {
          let cloneResponse = { ...response.data };
          cloneResponse = {
            ...cloneResponse,
            cattle: cloneResponse.cattle.id as any,
          };
          setHealthRecordData(cloneResponse as any);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return cattles && healthRecordData ? (
    <HealthRecordTable
      defaultValues={healthRecordData}
      cattles={cattles}
      edit={true}
    />
  ) : null;
};

export default HealthRecordEdit;

import { useEffect, useState } from 'react';
import UserService from '../../../services/user.service';
import { CattleType } from '../../../interfaces/cattle';
import HealthRecordTable from '../../../components/Table/HealthRecordTable';

const defaultValues = {
  checkup_date: '',
  health_notes: '',
  cattle: '',
  vaccinations: null,
  treatments: null,
  diagnosis: null,
  veterinarian: null,
};

const HealthRecordNew = () => {
  const [cattles, setCattles] = useState<null | CattleType[]>(null);

  useEffect(() => {
    UserService.getCattles(1, 1000)
      .then((response) => {
        setCattles(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return cattles ? (
    <HealthRecordTable
      defaultValues={defaultValues}
      cattles={cattles}
      edit={false}
    />
  ) : null;
};

export default HealthRecordNew;

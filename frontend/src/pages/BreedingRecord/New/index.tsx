import { useEffect, useState } from 'react';
import UserService from '../../../services/user.service';
import { CattleType } from '../../../interfaces/cattle';
import BreedingRecordTable from '../../../components/Table/BreedingRecordTable';

const defaultValues = {
  breeding_date: '',
  expected_calving_date: '',
  actual_calving_date: null,
  breeding_method: null,
  notes: null,
  byll: '',
  cow: '',
};

const BreedingRecordNew = () => {
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
    <BreedingRecordTable
      defaultValues={defaultValues}
      cattles={cattles}
      edit={false}
    />
  ) : null;
};

export default BreedingRecordNew;

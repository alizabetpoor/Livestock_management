import { useEffect, useState } from 'react';
import CattleTable from '../../../components/Table/CattleTable';
import UserService from '../../../services/user.service';
import { BreedType } from '../../../interfaces/breed';
import { OwnerType } from '../../../interfaces/owner';

const defaultValues = {
  gender_display: '',
  ear_tag_number: '',
  name: '',
  gender: '',
  date_of_birth: '',
  weight: '',
  height: '',
  photo: '',
  microchip_id: '',
  price: '',
  created: '',
  updated: '',
  breed: '',
  owner: '',
};

const CattleNew = () => {
  const [breeds, setBreeds] = useState<null | BreedType[]>(null);
  const [owners, setOwners] = useState<null | OwnerType[]>(null);

  useEffect(() => {
    UserService.getBreeds(1, 1000)
      .then((response) => {
        setBreeds(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

    UserService.getOwners(1, 1000)
      .then((response) => {
        setOwners(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return breeds && owners ? (
    <CattleTable
      defaultValues={defaultValues}
      owners={owners}
      breeds={breeds}
      edit={false}
    />
  ) : null;
};

export default CattleNew;

import { useEffect, useState } from 'react';
import CattleTable from '../../../components/Table/CattleTable';
import UserService from '../../../services/user.service';
import { BreedType } from '../../../interfaces/breed';
import { OwnerType } from '../../../interfaces/owner';
import { useParams } from 'react-router-dom';

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
interface tableDataType {
  [key: string]: string;
}
const CattleEdit = () => {
  let { id } = useParams();
  const [cattleData, setCattleData] = useState<null | tableDataType>(null);
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

    if (id) {
      UserService.getCattle(id)
        .then((response) => {
          let cloneResponse = { ...response.data };
          cloneResponse = {
            ...cloneResponse,
            owner: cloneResponse.owner.id as any,
            breed: cloneResponse.breed.id as any,
          };
          setCattleData(cloneResponse as any);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return breeds && owners && cattleData ? (
    <CattleTable
      defaultValues={cattleData}
      owners={owners}
      breeds={breeds}
      edit={true}
    />
  ) : null;
};

export default CattleEdit;

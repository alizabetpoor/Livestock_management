import { useEffect, useState } from 'react';
import UserService from '../../../services/user.service';
import { useParams } from 'react-router-dom';
import BreedTable from '../../../components/Table/BreedTable';

interface tableDataType {
  [key: string]: string;
}
const BreedEdit = () => {
  let { id } = useParams();
  const [breedData, setBreedData] = useState<null | tableDataType>(null);

  useEffect(() => {
    if (id) {
      UserService.getBreed(id)
        .then((response) => {
          setBreedData(response.data as any);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return breedData ? (
    <BreedTable defaultValues={breedData} edit={true} />
  ) : null;
};

export default BreedEdit;

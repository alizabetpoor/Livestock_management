import { useEffect, useState } from 'react';
import UserService from '../../../services/user.service';
import { useParams } from 'react-router-dom';
import OwnerTable from '../../../components/Table/OwnerTable';

interface tableDataType {
  [key: string]: string;
}
const OwnerEdit = () => {
  let { id } = useParams();
  const [ownerData, setOwnerData] = useState<null | tableDataType>(null);

  useEffect(() => {
    if (id) {
      UserService.getOwner(id)
        .then((response) => {
          setOwnerData(response.data as any);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return ownerData ? (
    <OwnerTable defaultValues={ownerData} edit={true} />
  ) : null;
};

export default OwnerEdit;

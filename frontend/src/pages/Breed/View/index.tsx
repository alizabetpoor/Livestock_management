import { useEffect, useState } from 'react';
import UserService from '../../../services/user.service';
import { useParams } from 'react-router-dom';
import CustomView from '../../../common/View';

interface tableDataType {
  [key: string]: string;
}

const BreedView = () => {
  let { id } = useParams();
  const [breedData, setBreedData] = useState<null | tableDataType>(null);
  const fields = [
    { name: 'name', label: 'نام' },
    { name: 'origin', label: 'ریشه' },
    { name: 'characteristics', label: 'خصوصیات' },
    { name: 'average_weight', label: 'وزن میانگین(کیلو گرم)' },
    { name: 'life_expectancy', label: 'طول عمر مورد انتظار(سال)' },
    { name: 'color', label: 'رنگ' },
  ];

  const getBreedData = () => {
    if (id) {
      UserService.getBreed(id)
        .then((response) => {
          console.log(response.data);
          setBreedData(response.data as any);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getBreedData();
  }, []);
  return breedData ? (
    <CustomView
      cattleData={breedData as any}
      entityName="breed"
      fields={fields}
    />
  ) : null;
};

export default BreedView;

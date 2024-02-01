import { useEffect, useState } from 'react';
import UserService from '../../../services/user.service';
import { useParams } from 'react-router-dom';
import CustomView from '../../../common/View';

interface tableDataType {
  [key: string]: string;
}

const CattleView = () => {
  let { id } = useParams();
  const [cattleData, setCattleData] = useState<null | tableDataType>(null);
  const fields = [
    { name: 'ear_tag_number', label: 'شماره ایرتگ' },
    { name: 'gender_display', label: 'جنسیت' },
    { name: 'name', label: 'نام' },
    { name: 'date_of_birth', label: 'تاریخ تولد' },
    { name: 'weight', label: 'وزن' },
    { name: 'height', label: 'قد' },
    { name: 'photo', label: 'عکس' },
    { name: 'microchip_id', label: 'آیدی میکروچیپ' },
    { name: 'price', label: 'قیمت' },
    { name: 'sire.ear_tag_number', label: 'پدر گاو' },
    { name: 'dam.ear_tag_number', label: 'مادر گاو' },
    { name: 'breed.name', label: 'نام نژاد' },
    { name: 'owner.last_name', label: 'نام صاحب گاو' },
  ];

  const getCattleData = () => {
    if (id) {
      UserService.getCattle(id)
        .then((response) => {
          console.log(response.data);
          setCattleData(response.data as any);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getCattleData();
  }, []);
  return cattleData ? (
    <CustomView
      cattleData={cattleData as any}
      entityName="cattle"
      fields={fields}
    />
  ) : null;
};

export default CattleView;

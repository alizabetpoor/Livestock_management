import { useEffect, useState } from 'react';
import UserService from '../../../services/user.service';
import { useParams } from 'react-router-dom';
import CustomView from '../../../common/View';

interface tableDataType {
  [key: string]: string;
}

const OwnerView = () => {
  let { id } = useParams();
  const [ownerData, setOwnerData] = useState<null | tableDataType>(null);
  const fields = [
    { name: 'first_name', label: 'نام' },
    { name: 'last_name', label: 'نام خانوادگی' },
    { name: 'phone_number', label: 'شماره موبایل' },
    { name: 'email', label: 'ایمیل' },
    { name: 'address', label: 'آدرس' },
    { name: 'company_name', label: 'نام شرکت' },
    { name: 'website', label: 'وبسایت' },
    { name: 'profile_picture', label: 'عکس پروفایل' },
  ];

  const getOwnerData = () => {
    if (id) {
      UserService.getOwner(id)
        .then((response) => {
          console.log(response.data);
          setOwnerData(response.data as any);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getOwnerData();
  }, []);
  return ownerData ? (
    <CustomView
      cattleData={ownerData as any}
      entityName="owner"
      fields={fields}
    />
  ) : null;
};

export default OwnerView;

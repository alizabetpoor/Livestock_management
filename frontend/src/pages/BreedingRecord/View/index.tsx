import { useEffect, useState } from 'react';
import UserService from '../../../services/user.service';
import { useParams } from 'react-router-dom';
import CustomView from '../../../common/View';

interface tableDataType {
  [key: string]: string;
}

const BreedingRecordView = () => {
  let { id } = useParams();
  const [breedingRecordData, setBreedingRecordData] =
    useState<null | tableDataType>(null);
  const fields = [
    { name: 'bull.ear_tag_number', label: 'پدر' },
    { name: 'cow.ear_tag_number', label: 'مادر' },
    { name: 'breeding_date', label: 'تاریخ پرورش' },
    { name: 'expected_calving_date', label: 'تاریخ زایمان مورد انتظار' },
    { name: 'actual_calving_date', label: 'تاریخ زایمان واقعی' },
    { name: 'breeding_method', label: 'روش پرورش' },
    { name: 'notes', label: 'یادداشت' },
  ];

  const getBreedingRecordData = () => {
    if (id) {
      UserService.getBreedingRecord(id)
        .then((response) => {
          console.log(response.data);
          setBreedingRecordData(response.data as any);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getBreedingRecordData();
  }, []);
  return breedingRecordData ? (
    <CustomView
      cattleData={breedingRecordData as any}
      entityName="breedingRecord"
      fields={fields}
    />
  ) : null;
};

export default BreedingRecordView;

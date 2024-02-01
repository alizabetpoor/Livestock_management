import { useEffect, useState } from 'react';
import UserService from '../../../services/user.service';
import { useParams } from 'react-router-dom';
import CustomView from '../../../common/View';

interface tableDataType {
  [key: string]: string;
}

const HealthRecordView = () => {
  let { id } = useParams();
  const [healthRecordData, setHealthRecordData] =
    useState<null | tableDataType>(null);
  const fields = [
    { name: 'cattle.ear_tag_number', label: 'گاو' },
    { name: 'checkup_date', label: 'تاریخ چکاپ' },
    { name: 'health_notes', label: 'یادداشت' },
    { name: 'vaccinations', label: 'واکسن' },
    { name: 'treatments', label: 'درمان' },
    { name: 'diagnosis', label: 'تشخیص' },
    { name: 'veterinarian', label: 'دامپزشک' },
  ];

  const getHealthRecordData = () => {
    if (id) {
      UserService.getHealthRecord(id)
        .then((response) => {
          console.log(response.data);
          setHealthRecordData(response.data as any);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getHealthRecordData();
  }, []);
  return healthRecordData ? (
    <CustomView
      cattleData={healthRecordData as any}
      entityName="healthRecord"
      fields={fields}
    />
  ) : null;
};

export default HealthRecordView;

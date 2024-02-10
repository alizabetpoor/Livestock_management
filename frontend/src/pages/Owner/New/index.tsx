import OwnerTable from '../../../components/Table/OwnerTable';

const defaultValues = {
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  address: '',
  company_name: null,
  website: null,
};

const OwnerNew = () => {
  return <OwnerTable defaultValues={defaultValues} edit={false} />;
};

export default OwnerNew;

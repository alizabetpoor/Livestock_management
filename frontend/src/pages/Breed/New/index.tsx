import BreedTable from '../../../components/Table/BreedTable';

const defaultValues = {
  name: '',
  origin: '',
  characteristics: '',
  average_weight: null,
  life_expectancy: null,
  color: null,
};

const BreedNew = () => {
  return <BreedTable defaultValues={defaultValues} edit={false} />;
};

export default BreedNew;

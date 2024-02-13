import { useEffect, useState } from 'react';
import CardOne from '../../components/CardOne.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import UserService from '../../services/user.service.ts';
import { FaWeightHanging, FaBirthdayCake } from 'react-icons/fa';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaSackDollar } from 'react-icons/fa6';

const cardsInfo = [
  {
    text: 'وزن میانگین دام ها',
    name: 'average_weight_of_cattles',
    icon: <FaWeightHanging className="fill-primary dark:fill-white" />,
  },
  {
    text: 'سن میانگین دام ها',
    name: 'average_age_of_cattles',
    icon: <FaBirthdayCake className="fill-primary dark:fill-white" />,
  },
  {
    text: 'قیمت میانگین دام ها',
    name: 'average_price_of_cattles',
    icon: <AiFillDollarCircle className="fill-primary dark:fill-white" />,
  },
  {
    text: 'قیمت کل دام ها',
    name: 'total_price_of_cattles',
    icon: <FaSackDollar className="fill-primary dark:fill-white" />,
  },
];

export interface ICattlesInfo {
  total_number_of_cattles: number;
  total_number_of_cows: number;
  total_number_of_bulls: number;
  average_weight_of_cattles: string;
  average_age_of_cattles: string;
  average_price_of_cattles: string;
  total_price_of_cattles: string;
}

const ECommerce = () => {
  const [cattlesInfo, setCattlesInfo] = useState<ICattlesInfo | null>(null);
  const [ageChartData, setAgeChartData] = useState([]);
  useEffect(() => {
    UserService.getCattlesInfo()
      .then((response) => {
        setCattlesInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    UserService.getCattlesAgeGroups()
      .then((response) => {
        setAgeChartData(response.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {cattlesInfo
          ? cardsInfo.map((data) => (
              <CardOne
                data={cattlesInfo[data.name as keyof ICattlesInfo]}
                hintText={data.text}
                icon={data.icon}
              />
            ))
          : null}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {ageChartData?.length ? <ChartOne data={ageChartData} /> : null}

        {cattlesInfo ? <ChartThree cattlesInfo={cattlesInfo} /> : null}
      </div>
    </>
  );
};

export default ECommerce;

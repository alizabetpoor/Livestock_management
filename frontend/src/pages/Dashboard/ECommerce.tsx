import { useEffect, useState } from 'react';
import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import ChatCard from '../../components/ChatCard.tsx';
import MapOne from '../../components/MapOne.tsx';
import TableOne from '../../components/TableOne.tsx';
import UserService from '../../services/user.service.ts';

const cardsInfo = [
  { text: 'وزن میانگین دام ها', name: 'average_weight_of_cattles' },
  { text: 'سن میانگین دام ها', name: 'average_age_of_cattles' },
  { text: 'قیمت میانگین دام ها', name: 'average_price_of_cattles' },
  { text: 'قیمت کل دام ها', name: 'total_price_of_cattles' },
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

  useEffect(() => {
    UserService.getCattlesInfo()
      .then((response) => {
        setCattlesInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {cattlesInfo
          ? cardsInfo.map((data) => (
              <CardOne
                data={cattlesInfo[data.name as keyof ICattlesInfo]}
                hintText={data.text}
              />
            ))
          : null}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        {cattlesInfo ? <ChartThree cattlesInfo={cattlesInfo} /> : null}

        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;

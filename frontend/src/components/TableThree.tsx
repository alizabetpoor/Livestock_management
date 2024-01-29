import EyeIcon from '../images/icon/EyeIcon';
import DeleteIcon from '../images/icon/DeleteIcon';
import { FaRegEdit } from 'react-icons/fa';
import { Button } from '../common/Button';
import { IoMdCreate } from 'react-icons/io';
import { ReactNode } from 'react';

interface MockDataType {
  [key: string]: string;
}

const mockData: MockDataType[] = [
  {
    ear_tag_number: '#4213232141442',
    name: 'wtrws',
    breed: 'آلمانی',
    gender: 'مذکر',
    date_of_birth: '1401/10/02',
  },
  {
    ear_tag_number: '#4213423142312',
    name: 'fafw',
    breed: 'ایرانی',
    gender: 'مونث',
    date_of_birth: '1400/05/12',
  },
  {
    ear_tag_number: '#521323213124',
    name: 'gfavc',
    breed: 'گرینویچ',
    gender: 'مذکر',
    date_of_birth: '1401/02/27',
  },
];

const headersName = ['آیدی ایرتگ', 'نام', 'نژاد', 'تاریخ تولد', 'جنسیت'];
const columnsName = [
  'ear_tag_number',
  'name',
  'breed',
  'date_of_birth',
  'gender',
];

interface TableThreeProps {
  tableBody: ReactNode;
}

const TableThree = ({ tableBody }: TableThreeProps) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-4 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="pb-2.5 flex justify-end">
        <Button
          link="/cattle/new"
          icon={<IoMdCreate />}
          text="ساخت رکورد جدید"
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-right dark:bg-meta-4">
              {headersName.map((headerName, index) => (
                <th
                  className={`${
                    index === 0 ? 'min-w-[220px]' : 'min-w-[120px]'
                  } py-4 px-4 font-medium text-black dark:text-white xl:pl-11`}
                >
                  {headerName}
                </th>
              ))}

              <th className="py-4 px-4 font-medium text-black dark:text-white">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((info, indexRow) => (
              <tr>
                {columnsName.map((columnName, indexColumn) => (
                  <td
                    className={`${
                      mockData.length - 1 === indexRow ? '' : 'border-b '
                    }border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11`}
                  >
                    {indexColumn > 1 ? (
                      <p className="text-black dark:text-white">
                        {info[columnName]}
                      </p>
                    ) : (
                      <h5 className="font-medium text-black dark:text-white">
                        {info[columnName]}
                      </h5>
                    )}
                  </td>
                ))}
                <td
                  className={`${
                    mockData.length - 1 === indexRow ? '' : 'border-b '
                  }border-[#eee] py-5 px-4 dark:border-strokedark`}
                >
                  <div className="flex items-center space-x-3.5 space-x-reverse">
                    <button className="hover:text-primary">
                      <EyeIcon />
                    </button>
                    <button className="hover:text-primary">
                      <FaRegEdit />
                    </button>
                    <button className="hover:text-primary">
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;

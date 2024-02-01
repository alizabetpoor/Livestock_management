import EyeIcon from '../../images/icon/EyeIcon';
import DeleteIcon from '../../images/icon/DeleteIcon';
import { FaRegEdit } from 'react-icons/fa';
import Button from '../Button';
import { IoMdCreate } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import Pagination from '../Pagination';
import { PaginationType } from '../../interfaces/pagination';

interface tableDataType {
  [key: string]: string;
}

interface TableProps {
  headersName: string[];
  columnsName: string[];
  data: tableDataType[];
  deleteService: (id: number) => Promise<AxiosResponse<any, any>>;
  entityName: string;
  getService: (page?: number) => void;
  paginationData: PaginationType | null;
}

const Table = ({
  headersName,
  columnsName,
  data,
  deleteService,
  entityName,
  getService,
  paginationData,
}: TableProps) => {
  const deleteEntity = (id: number) => {
    deleteService(id)
      .then(() => {
        getService();
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
                  key={index}
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
            {data.map((info, indexRow) => (
              <tr key={info.id}>
                {columnsName.map((columnName, indexColumn) => (
                  <td
                    key={indexColumn}
                    className={`${
                      data.length - 1 === indexRow ? '' : 'border-b '
                    }border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11`}
                  >
                    {indexColumn > 1 ? (
                      <p className="text-black dark:text-white">
                        {columnName.indexOf('.') !== -1
                          ? info[columnName.split('.')[0]][
                              columnName.split('.')[1] as any
                            ] || '-'
                          : info[columnName] || '-'}
                      </p>
                    ) : (
                      <h5 className="font-medium text-black dark:text-white">
                        {columnName.indexOf('.') !== -1
                          ? info[columnName.split('.')[0]][
                              columnName.split('.')[1] as any
                            ] || '-'
                          : info[columnName] || '-'}
                      </h5>
                    )}
                  </td>
                ))}
                <td
                  className={`${
                    data.length - 1 === indexRow ? '' : 'border-b '
                  }border-[#eee] py-5 px-4 dark:border-strokedark`}
                >
                  <div className="flex items-center space-x-3.5 space-x-reverse">
                    <Link
                      className="hover:text-primary"
                      to={`/${entityName}/view/${info.id}`}
                    >
                      <EyeIcon />
                    </Link>
                    <Link
                      className="hover:text-primary"
                      to={`/${entityName}/edit/${info.id}`}
                    >
                      <FaRegEdit />
                    </Link>
                    <button
                      className="hover:text-primary"
                      onClick={() => deleteEntity(Number(info.id))}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {paginationData ? (
        <Pagination paginationData={paginationData} getService={getService} />
      ) : null}
    </div>
  );
};

export default Table;

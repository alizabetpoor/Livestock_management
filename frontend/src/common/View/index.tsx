import { useParams } from 'react-router-dom';
import Button from '../Button';

interface CustomViewProps {
  cattleData: {
    [key: string]: string;
  };
  entityName: string;
  fields: { name: string; label: string }[];
}

const CustomView = ({ cattleData, entityName, fields }: CustomViewProps) => {
  let { id } = useParams();

  return (
    <div className="flex flex-col gap-9">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex flex-row justify-between">
          <h3 className="font-medium text-black dark:text-white">
            آیدی:{cattleData ? cattleData.id : '-'}
          </h3>
          <div className="gap-x-2 flex flex-row">
            <Button text="ویرایش" link={`/${entityName}/edit/${id}`} />
            <Button text="ایجاد" link={`/${entityName}/new`} />
          </div>
        </div>
        <form action="#">
          <div className="p-6.5 grid grid-cols-2">
            {cattleData
              ? fields.map((field: { name: string; label: string }) => (
                  <div className="w-full">
                    <label className="mb-2.5 font-bold text-lg block text-black dark:text-white">
                      {field.label}
                    </label>
                    <span className="w-full border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      {field.name.indexOf('.') !== -1
                        ? cattleData[field.name.split('.')[0]]?.[
                            field.name.split('.')[1] as any
                          ] || '-'
                        : cattleData[field.name] || '-'}
                    </span>
                  </div>
                ))
              : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomView;

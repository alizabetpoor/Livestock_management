import Breadcrumb from '../../components/Breadcrumb';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NumberError, RequiredError } from '../../constants';
import UserService from '../../services/user.service';
import { useNavigate } from 'react-router-dom';
import { errorExtractor } from '../../utils/ErrorExtractor';
import { toast } from 'react-toastify';

const schema = yup
  .object({
    origin: yup.string().required(RequiredError),
    name: yup.string().required(RequiredError),
    characteristics: yup.string().required(RequiredError),

    average_weight: yup
      .number()
      .typeError(NumberError)
      .nullable()
      .transform((_, val) => (val !== '' ? Number(val) : null)),
    color: yup.string().nullable(),
    life_expectancy: yup
      .number()
      .typeError(NumberError)
      .nullable()
      .transform((_, val) => (val !== '' ? Number(val) : null)),
  })
  .required();

interface BreedTableProps {
  defaultValues: any;
  edit: boolean;
}

const BreedTable = ({ defaultValues, edit }: BreedTableProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    if (edit) {
      UserService.editBreed(data, defaultValues.id)
        .then((response) => {
          if (response.status === 200) {
            toast.success('با موفقیت آپدیت شد');
            navigate('/breed/list');
          }
        })
        .catch((error: any) => {
          errorExtractor(error);
        });
    } else {
      UserService.createBreed(data)
        .then((response) => {
          if (response.status === 201) {
            toast.success('با موفقیت ایجاد شد');
            navigate('/breed/list');
          }
        })
        .catch((error: any) => {
          errorExtractor(error);
        });
    }
  };
  return (
    <>
      <Breadcrumb pageName="افزودن نژاد" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              مشخصات نژاد
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    نام<span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="jason"
                    {...register('name')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.name?.message as any}
                  </span>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    ریشه<span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="اسپانیایی"
                    {...register('origin')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.origin?.message as any}
                  </span>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    ویژگی<span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="شیرده"
                    {...register('characteristics')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.characteristics?.message as any}
                  </span>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    وزن میانگین(کیلوگرم)
                  </label>
                  <input
                    type="text"
                    placeholder="220"
                    {...register('average_weight')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.average_weight?.message as any}
                  </span>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    طول عمر(سال)
                  </label>
                  <input
                    type="text"
                    placeholder="22"
                    {...register('life_expectancy')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.life_expectancy?.message as any}
                  </span>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    رنگ
                  </label>
                  <input
                    type="text"
                    placeholder="مشکی"
                    {...register('color')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.color?.message as any}
                  </span>
                </div>
              </div>

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                {edit ? 'آپدیت' : 'ایجاد'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BreedTable;

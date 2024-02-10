import Breadcrumb from '../../components/Breadcrumb';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RequiredError } from '../../constants';
import UserService from '../../services/user.service';

const phoneRegExp = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
const emialRegExp = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;
const urlRegExp =
  /((https?):\/\/)(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const schema = yup
  .object({
    first_name: yup.string().required(RequiredError),
    last_name: yup.string().required(RequiredError),
    address: yup.string().required(RequiredError),
    phone_number: yup
      .string()
      .required(RequiredError)
      .matches(phoneRegExp, 'شماره موبایل درست نمیباشد.'),

    email: yup
      .string()
      .required(RequiredError)
      .matches(emialRegExp, 'ایمیل درست نمیباشد.'),
    company_name: yup.string().nullable(),
    website: yup
      .string()
      .nullable()
      .matches(urlRegExp, 'آدرس سایت درس نمیباشد'),
  })
  .required();

interface OwnerTableProps {
  defaultValues: any;
  edit: boolean;
}

const OwnerTable = ({ defaultValues, edit }: OwnerTableProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });
  const onSubmit = (data: any) => {
    if (edit) {
      UserService.editOwner(data, defaultValues.id);
    } else {
      UserService.createOwner(data);
    }
  };
  return (
    <>
      <Breadcrumb pageName="افزودن صاحب" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              مشخصات صاحب
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
                    placeholder="علی"
                    {...register('first_name')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.first_name?.message as any}
                  </span>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    نام خانوادگی<span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ضابط پور"
                    {...register('last_name')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.last_name?.message as any}
                  </span>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    وبسایت
                  </label>
                  <input
                    type="text"
                    placeholder="alizabetpour.ir"
                    {...register('website')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.website?.message as any}
                  </span>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    شماره موبایل<span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="09112079343"
                    {...register('phone_number')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.phone_number?.message as any}
                  </span>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    ایمیل<span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ali@gmail.com"
                    {...register('email')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.email?.message as any}
                  </span>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    نام کمپانی
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    {...register('company_name')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.company_name?.message as any}
                  </span>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    آدرس<span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    {...register('address')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.address?.message as any}
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

export default OwnerTable;

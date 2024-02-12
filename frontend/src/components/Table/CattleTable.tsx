import Breadcrumb from '../../components/Breadcrumb';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  DateError,
  NumberError,
  RequiredError,
  isValidFileType,
} from '../../constants';
import { OwnerType } from '../../interfaces/owner';
import { BreedType } from '../../interfaces/breed';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';
import { errorExtractor } from '../../utils/ErrorExtractor';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    ear_tag_number: yup.string().required(RequiredError),
    name: yup.string(),
    gender: yup.string().required(RequiredError).oneOf(['M', 'F']),
    date_of_birth: yup.date().typeError(DateError).required(RequiredError),
    weight: yup
      .number()
      .typeError(NumberError)
      .required(RequiredError)
      .nullable(RequiredError),
    height: yup
      .number()
      .typeError(NumberError)
      .nullable()
      .transform((_, val) => (val !== '' ? Number(val) : null)),
    microchip_id: yup.string().nullable(),
    price: yup
      .number()
      .typeError(NumberError)
      .nullable()
      .transform((_, val) => (val !== '' ? Number(val) : null)),
    photo: yup
      .mixed()
      .nullable()
      .test('is-valid-type', 'فایل شما باید عکس باشد', (value) => {
        if ((value as any)?.length !== 0 && value) {
          return isValidFileType((value as any)[0].name.toLowerCase(), 'image');
        } else {
          return true;
        }
      }),
    owner: yup.number().required(RequiredError),
    breed: yup.number().required(RequiredError),
  })
  .required();

interface CattleTableProps {
  owners: OwnerType[];
  breeds: BreedType[];
  defaultValues: any;
  edit: boolean;
}

const CattleTable = ({
  owners,
  breeds,
  defaultValues,
  edit,
}: CattleTableProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });
  const onSubmit = (data: any) => {
    let bodyData = { ...data };

    const year = data.date_of_birth.getFullYear();
    const month = String(data.date_of_birth.getMonth() + 1).padStart(2, '0');
    const day = String(data.date_of_birth.getDate()).padStart(2, '0');

    const date = `${year}-${month}-${day}`;
    bodyData = { ...bodyData, date_of_birth: date };
    const formData = new FormData();
    if (data.photo && data?.photo?.length !== 0) {
      bodyData = { ...bodyData, photo: bodyData.photo[0] };
      for (let key in bodyData) {
        formData.append(key, bodyData[key] === null ? '' : bodyData[key]);
      }
      if (edit) {
        UserService.editCattle(formData, defaultValues.id)
          .then((response) => {
            if (response.status === 200) {
              toast.success('با موفقیت آپدیت شد');
              navigate('/cattle/list');
            }
          })
          .catch((error: any) => {
            errorExtractor(error);
          });
      } else {
        UserService.createCattle(formData)
          .then((response) => {
            if (response.status === 201) {
              toast.success('با موفقیت ایجاد شد');
              navigate('/cattle/list');
            }
          })
          .catch((error: any) => {
            errorExtractor(error);
          });
      }
    } else {
      bodyData = { ...bodyData, photo: null };
      for (let key in bodyData) {
        formData.append(key, bodyData[key] === null ? '' : bodyData[key]);
      }
      if (edit) {
        UserService.editCattle(formData, defaultValues.id)
          .then((response) => {
            if (response.status === 200) {
              toast.success('با موفقیت آپدیت شد');
              navigate('/cattle/list');
            }
          })
          .catch((error: any) => {
            errorExtractor(error);
          });
      } else {
        UserService.createCattle(formData)
          .then((response) => {
            if (response.status === 201) {
              toast.success('با موفقیت ایجاد شد');
              navigate('/cattle/list');
            }
          })
          .catch((error: any) => {
            errorExtractor(error);
          });
      }
    }
  };
  return (
    <>
      <Breadcrumb pageName="افزودن گاو" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              مشخصات گاو
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    ایرتگ<span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="SWT-421432"
                    {...register('ear_tag_number')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.ear_tag_number?.message as any}
                  </span>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    نام
                  </label>
                  <input
                    type="text"
                    placeholder="Matthew"
                    {...register('name')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.name?.message as any}
                  </span>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-3 block text-black dark:text-white">
                    جنسیت<span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                            fill="#637381"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                            fill="#637381"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>
                    <select
                      {...register('gender')}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      <option value="M">نر</option>
                      <option value="F">ماده</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                  <span className="text-meta-1">
                    {errors.gender?.message as any}
                  </span>
                </div>

                <div className="w-full">
                  <label className="mb-3 block text-black dark:text-white">
                    تاریخ تولد<span className="text-meta-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      {...register('date_of_birth')}
                      className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <span className="text-meta-1">
                    {errors.date_of_birth?.message as any}
                  </span>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    وزن<span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="240"
                    {...register('weight')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.weight?.message as any}
                  </span>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    قد
                  </label>
                  <input
                    type="text"
                    placeholder="140"
                    {...register('height')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.height?.message as any}
                  </span>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    میکروچیپ ایدی
                  </label>
                  <input
                    type="text"
                    placeholder="412512321332"
                    {...register('microchip_id')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.microchip_id?.message as any}
                  </span>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    قیمت
                  </label>
                  <input
                    type="text"
                    placeholder="21000000"
                    {...register('price')}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <span className="text-meta-1">
                    {errors.price?.message as any}
                  </span>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-3 block text-black dark:text-white">
                    نژاد<span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                            fill="#637381"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                            fill="#637381"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>
                    <select
                      {...register('breed')}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      {breeds.map((breed) => (
                        <option key={breed.id} value={breed.id}>
                          {breed.name}
                        </option>
                      ))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                  <span className="text-meta-1">
                    {errors.breed?.message as any}
                  </span>
                </div>
                <div className="w-full">
                  <label className="mb-3 block text-black dark:text-white">
                    صاحب<span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                            fill="#637381"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                            fill="#637381"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>
                    <select
                      {...register('owner')}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      {owners.map((owner) => (
                        <option key={owner.id} value={owner.id}>
                          {owner?.first_name} {owner?.last_name}
                        </option>
                      ))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                  <span className="text-meta-1">
                    {errors.owner?.message as any}
                  </span>
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-black dark:text-white">
                  عکس
                </label>
                <input
                  type="file"
                  {...register('photo')}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
                <span className="text-meta-1">
                  {errors.photo?.message as any}
                </span>
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

export default CattleTable;

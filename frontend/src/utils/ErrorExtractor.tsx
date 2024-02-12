import { toast } from 'react-toastify';

export const errorExtractor = (error: any) => {
  console.log(error.response.data);
  for (let elem in error.response.data) {
    console.log();
    toast.error(`${elem} : ${error.response.data[elem][0]}`, {
      autoClose: 4000,
    });
  }
};

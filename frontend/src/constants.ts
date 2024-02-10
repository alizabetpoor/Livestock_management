export const RequiredError = 'پر کردن این فیلد الزامی می باشد.';
export const NumberError = 'عدد را به درستی وارد کنید.';
export const DateError = 'تاریخ را به درستی وارد کنید.';

export const validFileExtensions: { image: string[]; [key: string]: any } = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
};

export function isValidFileType(fileName: any, fileType: string) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
  );
}

export function commafy(num: number | string) {
  var str = num.toString().split('.');
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}

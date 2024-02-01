import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  bgColor?: string;
  textColor?: string;
  raduis?: string;
  icon?: ReactNode;
  text: string;
  link?: string;
  style?: string;
}

const Button = ({
  bgColor,
  textColor,
  raduis,
  icon,
  text,
  link,
}: ButtonProps) => {
  return (
    <>
      {link ? (
        <Link
          to={link}
          className={`inline-flex items-center justify-center ${
            raduis ? raduis : 'rounded-md'
          } ${
            bgColor ? bgColor : 'bg-meta-3'
          } py-2 px-10 text-center font-medium ${
            textColor ? textColor : 'text-white'
          } hover:bg-opacity-90 lg:px-8 xl:px-10${icon ? ' gap-2.5' : ''}`}
        >
          {icon ? icon : null}
          {text}
        </Link>
      ) : (
        <button
          className={`inline-flex items-center justify-center ${
            raduis ? raduis : 'rounded-md'
          } ${
            bgColor ? bgColor : 'bg-meta-3'
          } py-2 px-10 text-center font-medium ${
            textColor ? textColor : 'text-white'
          } hover:bg-opacity-90 lg:px-8 xl:px-10${icon ? ' gap-2.5' : ''}`}
        >
          {icon ? icon : null}
          {text}
        </button>
      )}
    </>
  );
};

export default Button;

import { Navigate } from 'react-router-dom';
import { ReactNode, useContext } from 'react';
import AuthContext from '../context/context';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  let { user } = useContext(AuthContext);

  return !user ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;

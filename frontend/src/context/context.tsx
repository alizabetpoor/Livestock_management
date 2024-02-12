import { createContext, useState, useEffect, ReactNode } from 'react';
import jwtDecode from 'jwt-decode';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface AuthContextValueType {
  user: any;
  authTokens: any;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextValueType>({
  user: null,
  authTokens: null,
  loginUser: (username: string, password: string) => {},
  logoutUser: () => {},
});

export default AuthContext;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  let [user, setUser] = useState(() =>
    localStorage.getItem('user')
      ? jwtDecode(JSON.parse(localStorage.getItem('user') || '{}')?.access)
      : null,
  );
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : null,
  );
  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let loginUser = async (username: string, password: string) => {
    api
      .post('/auth/jwt/create', {
        username,
        password,
      })
      .then((response) => {
        if (response.data.access) {
          localStorage.setItem('user', JSON.stringify(response.data));
          toast.success('با موفقیت وارد شدید');
          setAuthTokens(response.data);
          setUser(jwtDecode(response.data.access));
          navigate('/');
        } else {
          toast.error('نام کاربری یا رمز عبور اشتباه میباشد.');
        }
      })
      .catch((error) => {
        toast.error('نام کاربری یا رمز عبور اشتباه میباشد.');
      });
  };

  let logoutUser = () => {
    // e.preventDefault()
    localStorage.removeItem('user');
    setAuthTokens(null);
    setUser(null);
    navigate('/auth/signin');
  };

  // const updateToken = async () => {
  //     const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type':'application/json'
  //         },
  //         body:JSON.stringify({refresh:authTokens?.refresh})
  //     })

  //     const data = await response.json()
  //     if (response.status === 200) {
  //         setAuthTokens(data)
  //         setUser(jwtDecode(data.access))
  //         localStorage.setItem('authTokens',JSON.stringify(data))
  //     } else {
  //         logoutUser()
  //     }

  //     if(loading){
  //         setLoading(false)
  //     }
  // }

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  // useEffect(()=>{
  //     if(loading){
  //         updateToken()
  //     }

  //     const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
  //     let interval = setInterval(()=>{
  //         if(authTokens){
  //             updateToken()
  //         }
  //     }, REFRESH_INTERVAL)
  //     return () => clearInterval(interval)

  // },[authTokens, loading])

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

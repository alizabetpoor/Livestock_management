import api from './api';
import TokenService from './token.service';

const register = (username: string, email: string, password: string) => {
  return api.post('/auth/users', {
    email,
    username,
    password,
  });
};

const login = (username: string, password: string) => {
  return api
    .post('/auth/jwt/create', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;

import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import config from '../config';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [errorMessage, setErrorMessage] = useState('');

  const Login = async (inputs) => {
    const { data } = await axios.post(`${DOMAIN}/api/auth/login`, inputs);
    setCurrentUser(data);
  };

  const Logout = async (inputs) => {
    try {
      await axios.post(`${DOMAIN}/api/auth/logout`);
      setCurrentUser(null);
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, Login, Logout, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
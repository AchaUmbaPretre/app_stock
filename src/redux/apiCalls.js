import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import config from "../config";
import axios from "axios";

export const login = async (dispatch, user) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

  dispatch(loginStart());
  try {
    const res = await axios.post(`${DOMAIN}/api/auth/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

  dispatch(loginStart());
  try {
    const res = await axios.post(`${DOMAIN}/api/auth/register`, user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};




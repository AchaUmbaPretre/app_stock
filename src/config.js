import axios from "axios";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
/* baseURL: 'http://localhost:8080' */
/* REACT_APP_SERVER_DOMAIN : 'https://apindoe.loginsmart-cd.com' */

export default {
  REACT_APP_SERVER_DOMAIN : 'http://localhost:8080'
  // eslint-disable-next-line
};

export const userRequest = axios.create({
  baseURL: 'https://ndoe.vps116834.serveur-vps.net',
  header: { token: `Bearer ${TOKEN}` },
});
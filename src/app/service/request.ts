import axios, { AxiosRequestConfig } from "axios";
import { baseURL, jwtToken } from "src/assets/env";
import { postOnLocalStorage, getFromLocalStorage } from "./storage";
import { isExpired } from 'react-jwt'
import { JwtHelperService } from '@auth0/angular-jwt';

const api = axios.create({
  timeout: 6000,
  baseURL: baseURL,
});

let jwtHelper: JwtHelperService;

export const getToken = async () => {
  await api
    .post("/login", {
      login: "letscode",
      senha: "lets@123",
    })
    .then((response) => {
      console.log(response);
      postOnLocalStorage(jwtToken, response.data);
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};

axios.interceptors.request.use(async function (config) {
  const token = getFromLocalStorage(jwtToken);
  if (token !== null) {
    if(jwtHelper.isTokenExpired(token)){
      try{
        postOnLocalStorage(jwtToken, '');
        await getToken();

        const refreshedToken = getFromLocalStorage(jwtToken);
        config.headers = {
          Authorization: `Bearer ${refreshedToken}`
        }
      } catch(err) {
        console.log('Error on refresh token', err);
      }
    }

  }
  return config;
});

export const request = async (config: AxiosRequestConfig) => {
  if (config.method === 'GET') {
    config.data = '';
  };

  const token = getFromLocalStorage(jwtToken);

  if (token !== null) {
    config.headers = {
      Authorization: `Bearer ${token}`
    }
  }

  return await api.request(config);
}

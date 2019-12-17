
import axios, { AxiosInstance } from 'axios';
import { cacheAdapterEnhancer, Cache } from 'axios-extensions';


/* Axios default header config */
axios.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

/* Default Cache Maxage */
const defaultCache = new Cache({ maxAge: 100 * 1000 });

const axiosInstance: AxiosInstance = axios.create({
  // @ts-ignore
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    defaultCache,
  }),
  baseURL: 'https://swapi.co/api/',
});


export default axiosInstance;

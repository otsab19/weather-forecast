import axios from 'axios';
import {getEnv} from './getEnv.ts';


const endpoint = getEnv('VITE_WEATHER_API_URL');
console.log( `${endpoint}/api/?key=${getEnv('VITE_WEATHER_API_KEY')}`);
const axiosConfig = axios.create({
    baseURL: ``,
});


export default axiosConfig;

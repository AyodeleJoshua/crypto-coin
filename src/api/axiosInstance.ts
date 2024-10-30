import axios from 'axios';
import environmentVariables from '../utils/environmentVariables';

const axiosInstance = axios.create({
  baseURL: environmentVariables.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

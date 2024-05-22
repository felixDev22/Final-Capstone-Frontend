import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://kefi-hotel-booking-app.onrender.com/api/v1',
  withCredentials: true,
});

export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://kefi-hotel-booking-app.onrender.com',
  withCredentials: true,
});

export default axiosInstance;

import axios from 'axios';

export default axios.create({
  baseURL: 'https://kefi-hotel-booking-app.onrender.com/api/v1/hotels',
});

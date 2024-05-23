import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './hotels';
import reserveReducer from './slices/reserve/reserveSlice';
import loginReducer from './slices/auth/login';
import registerReducer from './slices/auth/register';
import { singleHotelReducer } from './slices/reserve/singleReserveSlice';
import { roomTypeReducer } from './slices/roomTypes/fetchRooms';
import reservationReducer from './reservation';
import roomsReducer from './room';

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    hotels: hotelsReducer,
    rooms: roomsReducer,
    reserve: reserveReducer,
    singleHotel: singleHotelReducer,
    roomType: roomTypeReducer,
    reservation: reservationReducer,
  },
});

export default store;

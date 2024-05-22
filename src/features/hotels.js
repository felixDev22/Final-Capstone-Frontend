import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [],
  loading: false,
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    addHotel: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.hotels = payload;
      // eslint-disable-next-line no-param-reassign
      state.loading = !state.loading;
    },
    deleteHotel: (state, action) => {
      const hotelIndex = state.hotels.findIndex(
        (hotel) => hotel.id === action.payload,
      );
      if (hotelIndex !== -1) {
        state.hotels.splice(hotelIndex, 1);
      }
    },
    newHotel: (state, action) => {
      const newHotel = action.payload;
      state.hotels.push(newHotel);
      // eslint-disable-next-line no-param-reassign
      state.loading = true;
    },
  },
});

export const { addHotel, deleteHotel, newHotel } = hotelsSlice.actions;
export default hotelsSlice.reducer;

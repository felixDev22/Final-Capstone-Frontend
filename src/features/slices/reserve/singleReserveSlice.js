import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  hotel: [],
  loading: false,
  error: null,
};

export const fetchHotel = createAsyncThunk(
  'hotels/fetchHotel',
  async (hotelId, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://kefi-hotel-booking-app.onrender.com/api/v1/hotels/${hotelId}`,
      );

      if (response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      // console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const singleHotelSlice = createSlice({
  name: 'singleHotel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotel.pending, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.loading = true;
        // eslint-disable-next-line no-param-reassign
        state.error = null;
      })
      .addCase(fetchHotel.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.loading = false;
        // eslint-disable-next-line no-param-reassign
        state.hotel = action.payload;
        // console.log(action.payload);
      })
      .addCase(fetchHotel.rejected, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.loading = false;
        // eslint-disable-next-line no-param-reassign
        state.error = true;
      });
  },
});

export const { actions: singleHotelActions, reducer: singleHotelReducer } =
  singleHotelSlice;

export const selectSingleHotel = (state) => state.singleHotel.hotel;
export const selectSingleHotelLoading = (state) => state.singleHotel.loading;
export const selectSingleHotelError = (state) => state.singleHotel.error;

export default singleHotelReducer;

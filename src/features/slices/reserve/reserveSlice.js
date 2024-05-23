import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const RESERVE_ACTION_TYPE = 'reserveHotel';

const reserveHotel = createAsyncThunk(
  RESERVE_ACTION_TYPE,
  async (data, thunkAPI) => {
    const reserveUrl =
      'https://kefi-hotel-booking-app.onrender.com/api/v1/reservations';
    try {
      const response = await axios.post(reserveUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.status === 200) {
        return response.data;
      }
      return thunkAPI.rejectWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  reservation: null,
  error: '',
};

const reserveSlice = createSlice({
  name: 'reserve',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(reserveHotel.pending, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.reservation = initialState.reservation;
      // eslint-disable-next-line no-param-reassign
      state.error = initialState.error;
    });
    builder.addCase(reserveHotel.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.reservation = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.error = initialState.error;
    });
    builder.addCase(reserveHotel.rejected, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.reservation = initialState.reservation;
      // eslint-disable-next-line no-param-reassign
      state.error = 'error';
    });
  },
});

export default reserveSlice.reducer;

export const selectReserveError = (state) => state.reserve.error;

export const reserveActions = {
  reserveHotel,
};

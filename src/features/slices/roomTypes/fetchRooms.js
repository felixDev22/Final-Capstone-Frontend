import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const RESERVE_ACTION_TYPE = 'fetchRooms';

export const readRooms = createAsyncThunk(
  RESERVE_ACTION_TYPE,
  async (hotelId, thunkAPI) => {
    const roomUrl = `https://kefi-hotel-booking-app.onrender.com/api/v1/hotels/${hotelId}`;
    try {
      const response = await axios.get(roomUrl, {
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
  rooms: [],
  error: '',
};

const roomTypeSlice = createSlice({
  name: 'roomType',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(readRooms.pending, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.rooms = initialState.rooms;
      // eslint-disable-next-line no-param-reassign
      state.error = initialState.error;
    });
    builder.addCase(readRooms.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.rooms = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.error = initialState.error;
    });
    builder.addCase(readRooms.rejected, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.rooms = initialState.rooms;
      // eslint-disable-next-line no-param-reassign
      state.error = 'error';
    });
  },
});

export const { actions: roomTypeActions, reducer: roomTypeReducer } = roomTypeSlice;

export const selectRooms = (state) => state.roomType.rooms;
export const selectRoomError = (state) => state.roomType.error;

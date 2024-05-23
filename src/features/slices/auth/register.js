import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'register',
  async (data, thunkAPI) => {
    const registerUrl = 'https://kefi-hotel-booking-app.onrender.com/signup';

    try {
      const response = await axios.post(registerUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
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
  data: {},
  iscreated: false,
  errors: '',
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.data = action.payload.data;
        // eslint-disable-next-line no-param-reassign
        state.iscreated = action.payload.iscreated;
      })
      .addCase(registerUser.rejected, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.errors = 'Email has already been taken';
        // eslint-disable-next-line no-param-reassign
        state.data = {};
      });
  },
});

export default registerSlice.reducer;
export const registerActions = registerSlice.actions;

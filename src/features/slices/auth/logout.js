import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logoutUser = createAsyncThunk('logout', async (_, thunkAPI) => {
  const logoutUrl = 'https://kefi-hotel-booking-app.onrender.com/logout';

  try {
    await axios.post(logoutUrl);
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState = {
  data: {},
  islogged: false,
  errors: '',
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.data = {};
      // eslint-disable-next-line no-param-reassign
      state.isLogged = false;
      // eslint-disable-next-line no-param-reassign
      state.errors = '';
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.errors = action.payload;
    });
  },
});

export default logoutSlice.reducer;
export const logoutActions = logoutSlice.actions;

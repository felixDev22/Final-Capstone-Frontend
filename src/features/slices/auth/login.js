import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a persist config for the login slice

export const loginUser = createAsyncThunk('login', async (data, thunkAPI) => {
  const loginUrl = 'https://kefi-hotel-booking-app.onrender.com/login';
  try {
    const response = await axios.post(loginUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'includ',
      withCredentials: true,
    });
    localStorage.setItem('userData', JSON.stringify(response.data.user));
    if (response.status === 200) {
      return response.data;
    }
    return thunkAPI.rejectWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// add for logoutUser
export const logoutUser = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    await axios.post('https://kefi-hotel-booking-app.onrender.com/logout');
    return { logged_out: true };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState = {
  data: {},
  islogged: false,
  isloggedOut: false,
  errors: '',
};
const loginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.data = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.islogged = action.payload.logged_in;
        const { status, errors } = action.payload;
        if (status === 401) {
          // eslint-disable-next-line no-param-reassign
          [state.errors] = errors;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.data = action.payload;
      });
  },
});

export default loginSlice.reducer;
export const loginActions = loginSlice.actions;

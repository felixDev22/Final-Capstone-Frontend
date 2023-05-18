import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  hotel: null,
  loading: false,
  error: null,
};

export const fetchHotel = createAsyncThunk(
  'hotels/fetchHotel',
  async (hotelId, thunkAPI) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/api/v1/hotels/${hotelId}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error.response.data)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const singleHotelSlice = createSlice({
  name: 'singleHotel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.hotel = action.payload;
      })
      .addCase(fetchHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export default singleHotelSlice.reducer;

export const { actions: singleHotelActions, reducer: singleHotelReducer } = singleHotelSlice;

// Export the selectors
export const selectSingleHotel = (state) => state.singleHotel.hotel;
export const selectSingleHotelLoading = (state) => state.singleHotel.loading;
export const selectSingleHotelError = (state) => state.singleHotel.error;

// Export any other selectors or helper functions if needed

// Export the async thunk
// export { fetchHotel };

// Export the slice itself
export default singleHotelReducer;

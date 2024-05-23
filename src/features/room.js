import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [],
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    addRooms: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.rooms = payload;
    },
  },
});

export const { addRooms } = roomsSlice.actions;
export default roomsSlice.reducer;

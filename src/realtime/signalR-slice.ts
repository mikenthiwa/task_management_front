import { createSlice } from '@reduxjs/toolkit';

export const signalRSlice = createSlice({
  name: 'signalR',
  initialState: {
    isConnected: false,
  },
  reducers: {
    setConnected(state) {
      state.isConnected = true;
    },
    setDisconnected(state) {
      state.isConnected = false;
    },
  },
});

export const { setConnected, setDisconnected } = signalRSlice.actions;

export default signalRSlice.reducer;

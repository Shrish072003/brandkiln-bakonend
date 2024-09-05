import { createSlice } from '@reduxjs/toolkit';

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

// Exporting the actions to be used in components
export const { showLoading, hideLoading } = alertSlice.actions;

// Exporting the reducer to be used in the store configuration
export default alertSlice.reducer;

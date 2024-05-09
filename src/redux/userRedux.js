import { createSlice } from "@reduxjs/toolkit";
/*
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isSidebarOpen: false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    FETCH_DATA_REQUEST : (state) => {
      state
    }
  },
});

export const { loginStart, loginSuccess, loginFailure,toggleSidebar } = userSlice.actions;
export default userSlice.reducer; */

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isSidebarOpen: false,
    loading: false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    fetchDataRequest: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.produit = action.payload
    },
    fetchDataFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, toggleSidebar, fetchDataRequest, fetchDataSuccess, fetchDataFailure } = userSlice.actions;
export default userSlice.reducer;
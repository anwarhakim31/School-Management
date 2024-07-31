import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: undefined,
  accessToken: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setUserData, setAccessToken } = authSlice.actions;
export default authSlice.reducer;

export const selectedUserData = (state) => state.auth.userData;
export const selectedAccessToken = (state) => state.auth.accessToken;

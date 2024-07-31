import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = authSlice.actions;
export default authSlice.reducer;

export const selectedUserData = (state) => state.auth.userData;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataDelete: undefined,
  dataEdit: undefined,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setDataDelete: (state, action) => {
      state.dataDelete = action.payload;
    },
    setDataEdit: (state, action) => {
      state.dataEdit = action.payload;
    },
  },
});

export const { setDataDelete } = adminSlice.actions;

export default adminSlice.reducer;

export const selectDataDelete = (state) => state.admin.dataDelete;

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

export const { setDataDelete, setDataEdit } = adminSlice.actions;

export default adminSlice.reducer;

export const selectedDataDelete = (state) => state.admin.dataDelete;
export const selectedDataEdit = (state) => state.admin.dataEdit;

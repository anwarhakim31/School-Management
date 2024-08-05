import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataDelete: undefined,
  dataEdit: undefined,
  dataDeleteMany: [],
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
    setDataDeleteMany: (state, action) => {
      state.dataDeleteMany = action.payload;
    },
  },
});

export const { setDataDelete, setDataEdit, setDataDeleteMany } =
  adminSlice.actions;

export default adminSlice.reducer;

export const selectedDataDelete = (state) => state.admin.dataDelete;
export const selectedDataEdit = (state) => state.admin.dataEdit;
export const selectedDataDeleteMany = (state) => state.admin.dataDeleteMany;

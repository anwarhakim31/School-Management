import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import adminReducer from "./slices/admin-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
  },
});

export default store;

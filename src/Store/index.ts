import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import usersReducer from "./userSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    users: usersReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

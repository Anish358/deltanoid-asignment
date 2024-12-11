import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import analyticsReducer from "../features/analytics/analyticsSlice";
import loginReducer from "../features/login/loginSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    analytics: analyticsReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

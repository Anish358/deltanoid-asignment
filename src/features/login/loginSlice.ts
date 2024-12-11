import { createSlice } from "@reduxjs/toolkit";
import { LoginState } from "../../types";

const initialState: LoginState = {
  user: {
    email: "",
    password: "",
  },
};

const loginSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default loginSlice.reducer;
export const { loginUser } = loginSlice.actions;

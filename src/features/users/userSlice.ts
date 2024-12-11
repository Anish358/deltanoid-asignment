import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../types";
import { fetchUsers } from "./userActions";

const initialState: UserState = {
  userData: null,
  status: "idle",
  error: null,
  count: 0,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUser: (state, action: PayloadAction<number>) => {
      // Check if state.data is not null before filtering
      if (state.userData) {
        state.userData = state.userData.filter(
          (user) => user.id !== action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error occurred";
      });
  },
});

export default userSlice.reducer;
export const { deleteUser } = userSlice.actions;

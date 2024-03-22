import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user : object | null
}

const initialState: AuthState = {
  user : null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUserInfo: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserInfo } = authSlice.actions;

export default authSlice.reducer;

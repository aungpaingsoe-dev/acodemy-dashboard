import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { remove, set } from "../../../utils/LocalStorage";

export interface AuthState {
  user: any
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUserInfo: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      set("token", action.payload.token);
      set("userInfo", JSON.stringify( action.payload ) );
    },
    removeUserInfo: (state) => {
      state.user = null;
      remove("token");
      remove("userInfo");
    },
  },
});
// Action creators are generated for each case reducer function
export const { addUserInfo, removeUserInfo } = authSlice.actions;

export default authSlice.reducer;

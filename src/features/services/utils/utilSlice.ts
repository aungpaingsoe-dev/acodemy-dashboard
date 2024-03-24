import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UtilState {
  breadcrumb : any[],
  drawerOpen : false,
}

const initialState: UtilState = {
    breadcrumb : [],
    drawerOpen : false
};

export const utilSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    updateBreadCrumb: (state, action: PayloadAction<any[]>) => {
      state.breadcrumb = action.payload;
    },
    drawerOpen: (state, action: PayloadAction<any>) => {
      state.drawerOpen = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { updateBreadCrumb, drawerOpen } = utilSlice.actions;

export default utilSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UtilState {
  breadcrumb : any[]
}

const initialState: UtilState = {
    breadcrumb : []
};

export const utilSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    updateBreadCrumb: (state, action: PayloadAction<any[]>) => {
      state.breadcrumb = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBreadCrumb } = utilSlice.actions;

export default utilSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/auth/authSlice";
import utilReducer from "./services/utils/utilSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    utils: utilReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

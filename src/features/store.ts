import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/auth/authSlice";
import utilReducer from "./services/utils/utilSlice";
import { authApi } from "./api/authApi";
import { categoryApi } from "./api/categoryApi";
import { courseApi } from "./api/courseApi";
import { studentProjectApi } from "./api/studentProjectApi";
import { studentReviewApi } from "./api/studentReviewApi";
import { ourTeamMemberApi } from "./api/ourTeamMemberApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    utils: utilReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [studentProjectApi.reducerPath]: studentProjectApi.reducer,
    [studentReviewApi.reducerPath]: studentReviewApi.reducer,
    [ourTeamMemberApi.reducerPath]: ourTeamMemberApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      categoryApi.middleware,
      courseApi.middleware,
      studentProjectApi.middleware,
      studentReviewApi.middleware,
      ourTeamMemberApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

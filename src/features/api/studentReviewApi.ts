import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const studentReviewApi = createApi({
  reducerPath: "studentReviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_BASE_URL }),
  tagTypes: ["StudentReview"],
  endpoints: (builder) => ({
    getStudentReviews: builder.query({
      query: (token) => ({
        url: "/v1/student-reviews",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["StudentReview"],
    }),
    getStudentReview: builder.query({
      query: (token) => ({
        url: "/v1/student-reviews",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["StudentReview"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetStudentReviewsQuery, useGetStudentReviewQuery } =
  studentReviewApi;

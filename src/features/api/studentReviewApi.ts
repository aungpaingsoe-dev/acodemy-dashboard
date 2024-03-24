import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "../../utils/LocalStorage";

// Define a service using a base URL and expected endpoints
export const studentReviewApi = createApi({
  reducerPath: "studentReviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_BASE_URL }),
  tagTypes: ["StudentReview"],
  endpoints: (builder) => ({
    getStudentReviews: builder.query({
      query: () => ({
        url: "/v1/student-reviews",
        headers: { authorization: `Bearer ${get("token")}` },
      }),
      providesTags: ["StudentReview"],
    }),
    getStudentReview: builder.query({
      query: (id) => ({
        url: `/v1/student-reviews/${id}`,
        headers: { authorization: `Bearer ${get("token")}` },
      }),
      providesTags: ["StudentReview"],
    }),
    createStudentReview: builder.mutation({
      query: (body) => ({
        url: "/v1/student-reviews",
        method: "POST",
        headers: { authorization: `Bearer ${get("token")}` },
        body,
      }),
      invalidatesTags: ["StudentReview"],
    }),
    editStudentReview: builder.mutation({
      query: ({ id, body }) => ({
        url: `/v1/student-reviews/${id}`,
        method: "POST",
        headers: { authorization: `Bearer ${get("token")}` },
        body,
      }),
      invalidatesTags: ["StudentReview"],
    }),
    deleteStudentReview: builder.mutation({
      query: (id) => ({
        url: `/v1/student-reviews/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${get("token")}` },
      }),
      invalidatesTags: ["StudentReview"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetStudentReviewsQuery,
  useGetStudentReviewQuery,
  useCreateStudentReviewMutation,
  useEditStudentReviewMutation,
  useDeleteStudentReviewMutation,
} = studentReviewApi;

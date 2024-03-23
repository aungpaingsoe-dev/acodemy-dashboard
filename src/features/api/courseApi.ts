import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_BASE_URL }),
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (token) => ({
        url: "/v1/courses",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["Course"],
    }),
    getCourse: builder.query({
      query: (token) => ({
        url: "/v1/courses",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["Course"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCoursesQuery } = courseApi;

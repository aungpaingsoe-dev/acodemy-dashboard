import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const studentProjectApi = createApi({
  reducerPath: "studentProjectApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_BASE_URL }),
  tagTypes: ["StudentProject"],
  endpoints: (builder) => ({
    getStudentProjects: builder.query({
      query: (token) => ({
        url: "/v1/student-projects",
        headers: { authorization: `Bearer ${token}` }
      }),
      providesTags: ["StudentProject"],
    }),
    getStudentProject: builder.query({
      query: (token) => ({
        url: "/v1/student-projects",
        headers: { authorization: `Bearer ${token}` }
      }),
      providesTags: ["StudentProject"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetStudentProjectsQuery, useGetStudentProjectQuery } = studentProjectApi;

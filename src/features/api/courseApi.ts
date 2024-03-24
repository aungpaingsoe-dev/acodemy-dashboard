import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "../../utils/LocalStorage";

// Define a service using a base URL and expected endpoints
export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_BASE_URL }),
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: "/v1/courses",
        headers: { authorization: `Bearer ${get("token")}` },
      }),
      providesTags: ["Course"],
    }),
    getCourse: builder.query({
      query: (id) => ({
        url: `/v1/courses/${id}`,
        headers: { authorization: `Bearer ${get("token")}` },
      }),
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation({
      query: (body) => ({
        url: "/v1/courses",
        method: "POST",
        headers: { authorization: `Bearer ${get("token")}` },
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    editCourse: builder.mutation({
      query: ({ id , body }) => ({
        url: `/v1/courses/${id}`,
        method: "POST",
        headers: { authorization: `Bearer ${get("token")}` },
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/v1/courses/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${get("token")}` },
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useEditCourseMutation,
  useDeleteCourseMutation,
} = courseApi;

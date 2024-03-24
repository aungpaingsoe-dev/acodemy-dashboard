import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "../../utils/LocalStorage";

// Define a service using a base URL and expected endpoints
export const studentProjectApi = createApi({
  reducerPath: "studentProjectApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_BASE_URL }),
  tagTypes: ["StudentProject"],
  endpoints: (builder) => ({
    getStudentProjects: builder.query({
      query: () => ({
        url: "/v1/student-projects",
        headers: { authorization: `Bearer ${get('token')}` },
      }),
      providesTags: ["StudentProject"],
    }),
    getStudentProject: builder.query({
      query: (id) => ({
        url: `/v1/student-projects/${id}`,
        headers: { authorization: `Bearer ${get('token')}` },
      }),
      providesTags: ["StudentProject"],
    }),
    createStudetProject: builder.mutation({
      query: (body) => ({
        url: "/v1/student-projects",
        method: "POST",
        headers: { authorization: `Bearer ${get('token')}` },
        body,
      }),
      invalidatesTags: ["StudentProject"],
    }),
    editStudentProject: builder.mutation({
      query: ({ id, body }) => ({
        url: `/v1/student-projects/${id}`,
        method: "POST",
        headers: { authorization: `Bearer ${get('token')}` },
        body,
      }),
      invalidatesTags: ["StudentProject"],
    }),
    deleteStudentProject: builder.mutation({
      query: (id) => ({
        url: `/v1/student-projects/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${get('token')}` },
      }),
      invalidatesTags: ["StudentProject"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetStudentProjectsQuery,
  useGetStudentProjectQuery,
  useCreateStudetProjectMutation,
  useEditStudentProjectMutation,
  useDeleteStudentProjectMutation,
} = studentProjectApi;

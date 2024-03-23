import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_BASE_URL }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (token) => ({
        url: "/v1/categories",
        headers: { authorization: `Bearer ${token}` }
      }),
      providesTags: ["Category"],
    }),
    getCategory: builder.query({
      query: (token) => ({
        url: "/v1/categories",
        headers: { authorization: `Bearer ${token}` }
      }),
      providesTags: ["Category"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCategoriesQuery } = categoryApi;

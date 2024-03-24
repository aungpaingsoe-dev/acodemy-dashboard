import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "../../utils/LocalStorage";

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_BASE_URL }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/v1/categories",
        headers: { authorization: `Bearer ${get("token")}` },
      }),
      providesTags: ["Category"],
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `/v1/categories/${id}`,
        headers: { authorization: `Bearer ${get("token")}` },
      }),
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: "/v1/categories",
        method: "POST",
        headers: { authorization: `Bearer ${get("token")}` },
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    editCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/v1/categories/${id}`,
        method: "PUT",
        headers: { authorization: `Bearer ${get("token")}` },
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/v1/categories/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${get("token")}` },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

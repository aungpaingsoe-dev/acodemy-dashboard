import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "../../utils/LocalStorage";

// Define a service using a base URL and expected endpoints
export const ourTeamMemberApi = createApi({
  reducerPath: "ourTeamMember",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_BASE_URL }),
  tagTypes: ["OurTeamMember"],
  endpoints: (builder) => ({
    getTeamMembers: builder.query({
      query: () => ({
        url: "/v1/our-team-members",
        headers: { authorization: `Bearer ${get("token")}` },
      }),
      providesTags: ["OurTeamMember"],
    }),
    getTeamMember: builder.query({
      query: (id) => ({
        url: `/v1/our-team-members/${id}`,
        headers: { authorization: `Bearer ${get("token")}` },
      }),
      providesTags: ["OurTeamMember"],
    }),
    createTeamMember: builder.mutation({
      query: (body) => ({
        url: "/v1/our-team-members",
        method: "POST",
        headers: { authorization: `Bearer ${get("token")}` },
        body,
      }),
      invalidatesTags: ["OurTeamMember"],
    }),
    editTeamMember: builder.mutation({
      query: ({ id, body }) => ({
        url: `/v1/our-team-members/${id}`,
        method: "POST",
        headers: { authorization: `Bearer ${get("token")}` },
        body,
      }),
      invalidatesTags: ["OurTeamMember"],
    }),
    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `/v1/our-team-members/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${get("token")}` },
      }),
      invalidatesTags: ["OurTeamMember"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTeamMembersQuery,
  useGetTeamMemberQuery,
  useCreateTeamMemberMutation,
  useEditTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = ourTeamMemberApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL
  }),
  endpoints: (builder) => ({
    // Authentication Endpoints
    signup: builder.mutation({
      query: (body) => ({
        url: `users/`,
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => {
        console.log(body);
        return { url: "auth_session/login", method: "POST", body };
    }}),
    logout: builder.query({
      query: () => ({ url: `auth_session/logout`, method: "DELETE" }),
    }),
    getProfile: builder.query({
      query: () => ({ url: `users/me/`, method: "GET" }),
    }),
    updateProfile: builder.mutation({
      query: (body) => ({ url: `users/me/`, method: "PUT", body }),
    }),
    // Category Endpoints
    getCategories: builder.query({
      query: () => ({ url: `category`, method: "GET" }),
    }),
    // Quiz Groups Endpoints
    addQuizGroup: builder.mutation({
      query: (body) => ({ url: `create_quiz_group`, method: "POST", body }),
    }),
    updateQuizGroup: builder.mutation({
      query: ({ id, body }) => ({
        url: `create_quiz_group/${id}`,
        method: "PUT",
        body,
      }),
    }),
    getPublicQuizGroups: builder.query({
      query: (page) => ({
        url: `public_quiz_groups?page=${page}`,
        method: "GET",
      }),
    }),
    getUserQuizGroups: builder.query({
      query: (page) => ({
        url: `user_quiz_groups?page=${page}`,
        method: "GET",
      }),
    }),
    deleteUserQuizGroups: builder.query({
      query: (id) => ({
        url: `delete_quiz_group/${id}`,
        method: "DELETE",
      }),
    }),
    // Answers Endpoints
    submitAnswers: builder.mutation({
      query: (body) => ({
        url: `submit_answers`,
        method: "POST",
        body,
      }),
    }),
    getUserQuizzesTaken: builder.query({
      query: () => ({
        url: `get_user_quiz_groups_results`,
        method: "GET",
      }),
    }),
    getUserQuizTaken: builder.query({
      query: (id) => ({
        url: `get_user_quiz_group_result/${id}`,
        method: "GET",
      }),
    }),
    getStatus: builder.query({
      query: () => ({url: "status", method: "GET"}),
    })
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetCategoriesQuery,
  useAddQuizGroupMutation,
  useUpdateQuizGroupMutation,
  useGetPublicQuizGroupsQuery,
  useGetUserQuizGroupsQuery,
  useDeleteUserQuizGroupsQuery,
  useSubmitAnswersMutation,
  useGetUserQuizzesTakenQuery,
  useGetUserQuizTakenQuery,
  useGetStatusQuery,
} = api;

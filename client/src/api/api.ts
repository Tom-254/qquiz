import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
    prepareHeaders: (headers) => {
      // Get the session_id cookie
      const _my_session_id = document.cookie
        .split("; ")
        .find((row) => row.startsWith("_my_session_id="))
        ?.split("=")[1];

      // headers.set("Content-Type", "application/json");

      // Add the session_id to the request headers
      if (_my_session_id) {
        headers.set("_my_session_id", _my_session_id);
      }

      return headers;
    },
    credentials: "include",
    transformResponse: (response: any) => {
      const myHeader = response.headers;
      console.log(myHeader);
      return response;
    },
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
      query: (body) => ({
        url: "auth_session/login",
        method: "POST",
        mode: "cors",
        body,
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: `auth_session/logout`,
        method: "DELETE",
        mode: "cors",
      }),
    }),
    getProfile: builder.query({
      query: () => ({ url: `users/me/`, method: "GET", mode: "cors" }),
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: `users/me/`,
        method: "PUT",
        mode: "cors",
        body,
      }),
    }),
    // Category Endpoints
    getCategories: builder.query({
      query: () => ({ url: `category`, method: "GET", mode: "cors" }),
    }),
    // Quiz Groups Endpoints
    addQuizGroup: builder.mutation({
      query: (body) => ({
        url: `create_quiz_group`,
        method: "POST",
        mode: "cors",
        body,
      }),
    }),
    updateQuizGroup: builder.mutation({
      query: ({ id, body }) => ({
        url: `create_quiz_group/${id}`,
        method: "PUT",
        mode: "cors",
        body,
      }),
    }),
    getPublicQuizGroups: builder.query({
      query: (page) => ({
        url: `public_quiz_groups?page=${page}`,
        method: "GET",
        mode: "cors",
      }),
    }),
    getUserQuizGroups: builder.query({
      query: (page) => ({
        url: `user_quiz_groups?page=${page}`,
        method: "GET",
        mode: "cors",
      }),
    }),
    deleteUserQuizGroups: builder.query({
      query: (id) => ({
        url: `delete_quiz_group/${id}`,
        method: "DELETE",
        mode: "cors",
      }),
    }),
    // Answers Endpoints
    submitAnswers: builder.mutation({
      query: (body) => ({
        url: `submit_answers`,
        method: "POST",
        mode: 'cors',
        body,
      }),
    }),
    getUserQuizzesTaken: builder.query({
      query: () => ({
        url: `get_user_quiz_groups_results`,
        method: "GET",
        mode: 'cors'
      }),
    }),
    getUserQuizTaken: builder.query({
      query: (id) => ({
        url: `get_user_quiz_group_result/${id}`,
        method: "GET",
        mode: 'cors'
      }),
    }),
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
} = api;

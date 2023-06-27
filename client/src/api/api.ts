import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getPhotos: builder.query({
      query: () => "photos",
    }),
    getPhotoById: builder.query({
      query: (photoId: number) => `photos/${photoId}`,
    }),
    updatePhoto: builder.mutation({
      query: ({ id, data }) => ({
        url: `photos/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPhotosQuery,
  useGetPhotoByIdQuery,
  useUpdatePhotoMutation,
} = api;

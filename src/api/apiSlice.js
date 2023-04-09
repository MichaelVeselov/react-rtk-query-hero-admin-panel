import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Heroes'],
  endpoints: (builder) => ({
    getHeroes: builder.query({
      query: () => '/heroes',
      providesTags: ['Heroes'],
    }),
    createHero: builder.mutation({
      query: (body) => ({
        url: '/heroes',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Heroes'],
    }),
    deleteHero: builder.mutation({
      query: (id) => ({
        url: `/heroes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Heroes'],
    }),
  }),
});

export const {
  useGetHeroesQuery,
  useCreateHeroMutation,
  useDeleteHeroMutation,
} = apiSlice;

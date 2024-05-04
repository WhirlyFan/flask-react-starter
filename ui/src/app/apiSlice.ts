// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from './types';

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/api'
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Users', 'CurrentUser'],
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getUsers` endpoint is a "query" operation that returns data
    // TODO: Add TS types for the response data (import from from a types.ts file)
    // TODO: Abstract the endpoints into their own file
    getUsers: builder.query({
      // Based off the reducer path set above, the URL for the request is '/api/users'
      query: () => '/users',
      providesTags: ['Users']
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`
    }),
    getCurrentUser: builder.query({
      query: () => '/auth/session',
      providesTags: ['CurrentUser'],
    }),
    signup: builder.mutation({
      query: (user: User) => ({
        url: '/auth/signup',
        method: 'POST',
        body: user
      }),
      invalidatesTags: (result) => (result ? ['CurrentUser'] : [])
    }),
    login: builder.mutation({
      query: (user: User) => ({
        url: '/auth/login',
        method: 'POST',
        body: user
      }),
      invalidatesTags: (result) => (result ? ['CurrentUser'] : [])
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      }),
      // Invalidate all tags that require a user to be logged in to view
      invalidatesTags: (result) => (result ? ['CurrentUser', 'Users'] : [])
    })
  })
});

// Export the auto-generated hook for the `getUsers` query endpoint
export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetCurrentUserQuery,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation
} = apiSlice;

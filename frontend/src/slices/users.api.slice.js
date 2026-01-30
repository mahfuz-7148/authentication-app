import {apiSlice} from './api.slice.js';

const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register user
    register: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    // logout user
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['User']
    }),
    // login user
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    // get profile
    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: 'GET'
      }),
      providesTags: ['User']
    }),
    // update profile
    updateProfile: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['User']
    }),
  })
})
export const {useRegisterMutation, useLogoutMutation, useLoginMutation, useGetProfileQuery, useUpdateProfileMutation} = userApiSlice
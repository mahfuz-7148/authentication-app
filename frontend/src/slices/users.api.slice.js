import {apiSlice} from './api.slice.js';

const users_url = '/api/users'
 const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: data => ({
        url: `${users_url}/register`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${users_url}/logout`,
        method: 'POST'
      }),
      invalidatesTags: ['User']
    }),
    login: builder.mutation({
      query: data => ({
        url: `${users_url}/login`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    updateProfile: builder.mutation({
      query: data => ({
        url: `${users_url}/updateProfile`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    changePassword: builder.mutation({
      query: data => ({
        url: `${users_url}/updatePassword`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['User']
    }),
  })
})
export const {useRegisterMutation, useLogoutMutation, useLoginMutation, useUpdateProfileMutation, useChangePasswordMutation} = userApiSlice
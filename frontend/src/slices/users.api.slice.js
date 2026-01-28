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
    })
  })
})
export const {useRegisterMutation} = userApiSlice
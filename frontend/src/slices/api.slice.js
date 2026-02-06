import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API,
  credentials: 'include',
  prepareHeaders: headers => {
    if (!headers.has('Content-type')) {
      headers.set('Content-type', 'application/json')
    }
    return headers
  }
})

const baseQueryWithError = async (args, api, extraOptions) => {
 const result = baseQuery(args, api, extraOptions)
  if (result?.error?.status === 401) {
    console.warn('unauthorized api')
  }
  return result
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithError,
  tagTypes: ['User'],
  endpoints: builder => ({})
})
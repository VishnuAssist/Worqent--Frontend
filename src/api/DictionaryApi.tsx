// src/services/dictionaryApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DictionaryType } from '../models/DictionaryType';
import type { MetaData } from '../models/paginationType';

import { baseQuery } from './BaseQueryApi';

export const dictionaryApi = createApi({
  reducerPath: 'dictionaryApi',
  // baseQuery,
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8989/' }),
  tagTypes: ['Dictionary'],
  endpoints: (builder) => ({
    getDictionaries: builder.query<
      { items: DictionaryType[]; metaData: MetaData },
      any
    >({
      query: (args) => ({
        method: 'GET',
        url: 'dictionary',
        params: { ...args },
      }),
      // transformResponse: (response, meta) => datawithmeta(response, meta),
      providesTags: [{ type: 'Dictionary', id: 'LIST' }],
    }),

    addOrUpdateDictionary: builder.mutation<DictionaryType, Partial<DictionaryType>>({
      query: (args) => {
        const { _id, ...body } = args;
        return {
          method: _id ? 'PATCH' : 'POST',
          url: _id ? `dictionary/${_id}` : 'dictionary',
          body,
        };
      },
      invalidatesTags: [{ type: 'Dictionary', id: 'LIST' }],
    }),

    deleteDictionary: builder.mutation<void, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `dictionary/${id}`,
      }),
      invalidatesTags: [{ type: 'Dictionary', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetDictionariesQuery,
  useAddOrUpdateDictionaryMutation,
  useDeleteDictionaryMutation,
} = dictionaryApi;

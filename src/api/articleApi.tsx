import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import type { ArticleType as Article } from "../models/ArticleType";
import type { MetaData } from "../models/paginationType";

export const articleApi = createApi({
  reducerPath: "articleApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Article"],
  keepUnusedDataFor: 0,

  endpoints: (builder) => ({
    // ✅ GET ALL
    getAllArticles: builder.query<
      Article[],
      any
    >({
      query: (args) => ({
        method: "GET",
        url: "/articles",
        params: { ...args },
      }),
      providesTags: ["Article"],
    }),

    // ✅ GET BY ID
    getArticleById: builder.query<Article, number>({
      query: (id) => ({
        method: "GET",
        url: `/articles/${id}`,
      }),
      providesTags: ["Article"],
    }),

    // ✅ CREATE / UPDATE
    addUpdateArticle: builder.mutation<Article, Article>({
      query: (args) => ({
        method: args.id ? "PUT" : "POST",
        url: args.id ? `/articles/${args.id}` : "/articles",
        body: args,
      }),
      invalidatesTags: (_r, error) => (error ? [] : ["Article"]),
    }),

    // ✅ DELETE
    deleteArticle: builder.mutation<void, number>({
      query: (id) => ({
        method: "DELETE",
        url: `/articles/${id}`,
      }),
      invalidatesTags: (_r, error) => (error ? [] : ["Article"]),
    }),
  }),
});

export const {
  useGetAllArticlesQuery,
  useGetArticleByIdQuery,
  useAddUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;

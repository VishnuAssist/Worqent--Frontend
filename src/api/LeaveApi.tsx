import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MetaData } from "../models/paginationType";
import type { LeaveType } from "../models/LeaveType";

export const leaveApi = createApi({
  reducerPath: "leaveApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8989/" }),
  tagTypes: ["Leave"],
  endpoints: (builder) => ({
    getLeaves: builder.query<
      { items: LeaveType[]; metaData: MetaData },
      any
    >({
      query: (params) => ({
        url: "leave",
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Leave", id: "LIST" }],
    }),

    addOrUpdateLeave: builder.mutation<LeaveType, Partial<LeaveType>>({
      query: ({ _id, ...body }) => ({
        url: _id ? `leave/${_id}` : "leave",
        method: _id ? "PATCH" : "POST",
        body,
      }),
      invalidatesTags: [{ type: "Leave", id: "LIST" }],
    }),

    deleteLeave: builder.mutation<void, string>({
      query: (id) => ({
        url: `leave/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Leave", id: "LIST" }],
    }),
  }),
});

export const {
  useGetLeavesQuery,
  useAddOrUpdateLeaveMutation,
  useDeleteLeaveMutation,
} = leaveApi;

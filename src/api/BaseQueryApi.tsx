// src/services/api/baseQuery.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8989',
  // Optional: global headers
  prepareHeaders: (headers) => {
    // Example: add auth token
    // const token = localStorage.getItem('token');
    // if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});
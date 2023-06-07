import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const DataMiddleware = createApi({
    reducerPath : "data-middleware",
    baseQuery : fetchBaseQuery({
        baseUrl: ""
    }),
    endpoints: (build) => ({})
})
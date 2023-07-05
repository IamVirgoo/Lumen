import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {IUserDoctorDataRequest, IUserDoctorShortDataRequest} from "../models/IUserDoctor";

export const DataService = createApi({
    reducerPath : "data-service",
    baseQuery : fetchBaseQuery({
        baseUrl: "http://localhost:8888"
    }),
    endpoints: (build) => ({
        getDoctors : build.query<IUserDoctorShortDataRequest[], any>({
            query : () => ({
                url : '/doctors',
                method : "GET",
                redirect : "follow"
            })
        }),
        getDoctor : build.query<IUserDoctorDataRequest, string>({
            query : ( id ) => ({
                url : `/doctors/${id}`,
                method : "GET",
                redirect : "follow"
            })
        })
    })
})

export const {
    useGetDoctorsQuery,
    useGetDoctorQuery,
} = DataService
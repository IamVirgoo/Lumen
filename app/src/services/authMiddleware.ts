import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import {IUserPatient, IUserPatientLoginRequest, IUserPatientRegistrationRequest} from "../models/IUserPatient";

export const AuthMiddleware = createApi({
    reducerPath : "auth-middleware",
    baseQuery : fetchBaseQuery({
        baseUrl: ""
    }),
    tagTypes : ['Auth'],
    endpoints: (build) => ({
        login : build.mutation<IUserPatient, Partial<IUserPatientLoginRequest>>({
            query : ( ...auth ) => ({
                url : "/authenticate",
                headers : {
                    "Content-Type": "application/json"
                },
                method: "POST",
                redirect: "follow",
                body: JSON.stringify(auth)
            })
        }),
        registration : build.mutation<IUserPatient, Partial<IUserPatientRegistrationRequest>>({
            query : ( ...auth ) => ({
                url : "/registration",
                headers : {
                    "Content-Type": "application/json"
                },
                method: "POST",
                redirect: "follow",
                body: JSON.stringify(auth)
            })
        })
    })
})
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUserPatient, IUserPatientLoginRequest, IUserPatientRegistrationRequest } from "../models/IUserPatient";

export const AuthService = createApi({
    reducerPath : "auth-service",
    baseQuery : fetchBaseQuery({
        baseUrl: "http://localhost:8080"
    }),
    endpoints: (build) => ({
        signIn : build.mutation<IUserPatient, IUserPatientLoginRequest>({
            query : ( ...auth ) => ({
                url : "/authenticate",
                headers : {
                    "Content-Type": "application/json"
                },
                method: "POST",
                redirect: "follow",
                body: JSON.stringify(auth)
            }),
        }),
        signUp : build.mutation<IUserPatient, Partial<IUserPatientRegistrationRequest>>({
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

export const {
    useSignInMutation,
    useSignUpMutation
} = AuthService
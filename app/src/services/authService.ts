import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUserPatient, IUserPatientLoginRequest, IUserPatientRegistrationRequest } from "../models/IUserPatient";

export const AuthService = createApi({
    reducerPath : "auth-service",
    baseQuery : fetchBaseQuery({
        baseUrl: "http://localhost:8888"
    }),
    endpoints: (build) => ({
        signIn : build.mutation<IUserPatient, Partial<IUserPatientLoginRequest>>({
            query : ( auth ) => ({
                url : "/auth",
                headers : {
                    "Content-Type": "application/json"
                },
                method: "POST",
                redirect: "follow",
                body: JSON.stringify(auth)
            }),
        }),
        signUp : build.mutation<IUserPatient, Partial<IUserPatientRegistrationRequest>>({
            query : ( auth ) => ({
                url : "/user",
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
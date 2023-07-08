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
        }),
        getUser : build.query<any, string>({
            query : ( arg ) => ({
                url : "/user",
                headers : {
                    "Authorization": "Bearer " + arg
                },
                method : "GET",
                redirect : "follow"
            })
        }),
        sendCode : build.query<any, string>({
            query : ( telephone ) => ({
                url : '/send_confirm_sms?number=' + telephone,
                method : "GET",
            })
        }),
        confirmCode : build.query<any, { telephone : string, confirmCode : string }>({
            query : ( arg ) => ({
                url : '/confirm_code?number=' + arg.telephone + '&code=' + arg.confirmCode,
                headers : {
                    "Content-Type": "application/json"
                },
                method : "GET",
                redirect : "follow"
            })
        })
    })
})

/*
* useSendCodeQuery and useConfirmCodeQuery - not works
* */
export const {
    useSignInMutation,
    useSignUpMutation,
    useGetUserQuery,
    useSendCodeQuery,
    useConfirmCodeQuery
} = AuthService
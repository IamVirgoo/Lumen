import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUserDoctorDataRequest, IUserDoctorShortDataRequest } from "../models/IUserDoctor";

export const DataService = createApi({
    reducerPath : "data-service",
    baseQuery : fetchBaseQuery({
        baseUrl: "http://localhost/lumen"
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
        }),
        setAppointment : build.mutation<any, { token : string, id : string }>({
            query : ( arg ) => ({
                url : `/patient/appointment/${arg.id}`,
                headers : {
                    "Authorization": "Bearer " + arg.token
                },
                method : "POST",
                redirect : "follow"
            })
        }),
        setDoctorAnamnesis : build.mutation<any, { token : string, id : number, text : { anamnesis : string }}>({
            query : ( arg ) => ({
                url : `doctor/appointment/${arg.id}/anamnesis`,
                headers : {
                    "Authorization": "Bearer " + arg.token
                },
                method : "POST",
                redirect : "follow",
                body : arg.text
            })
        }),
        getAppointments : build.query<any, string>({
            query : ( token ) => ({
                url : '/patient/appointments',
                headers : {
                    "Authorization": "Bearer " + token
                },
                method : "GET",
                redirect : "follow"
            })
        }),
        getAppointment : build.query<any, { token : string, id : number }>({
            query : ( arg ) => ({
                url : `/patient/appointment/${arg.id}`,
                headers : {
                    "Authorization": "Bearer " + arg.token
                },
                method : "GET",
                redirect : "follow"
            })
        }),
        getDoctorAppointment : build.query<any, { token : string, id : number }>({
            query : ( arg ) => ({
                url : `/doctor/appointment/${arg.id}`,
                headers : {
                    "Authorization": "Bearer " + arg.token
                },
                method : "GET",
                redirect : "follow"
            })
        }),
        getDoctorTodayAppointments : build.query<any, string>({
            query : ( token ) => ({
                url : '/doctor/appointments/today',
                headers : {
                    "Authorization": "Bearer " + token
                },
                method : "GET",
                redirect : "follow"
            })
        }),
        getDoctorAllAppointments : build.query<any, string>({
            query : ( token ) => ({
                url : '/doctor/appointments/all',
                headers : {
                    "Authorization": "Bearer " + token
                },
                method : "GET",
                redirect : "follow"
            })
        }),
        getHealth : build.query<any, { user_id : number, date : string }>({
            query : ( arg ) => ({
                url : `/patient/health?user_id=${arg.user_id}&date=${arg.date}`,
                headers : {
                    "Content-Type": "application/json"
                },
                method : "GET",
                redirect : "follow"
            })
        }),
        setHealth : build.mutation<any, { token : string, obj : any }>({
            query : ( arg ) => ({
                url : '/patient/health',
                headers : {
                    "Authorization": "Bearer " + arg.token
                },
                method : "POST",
                redirect : "follow",
                body : {
                    "pressure": arg.obj.pressure,
                    "temperature": arg.obj.temperature,
                    "pulse": arg.obj.pulse,
                    "saturation": arg.obj.saturation,
                    "sugar": arg.obj.sugar,
                    "state": arg.obj.state,
                    "complaints": "string"
                }
            })
        })
    })
})

/*TODO: optionally create the models for Appointment/s and Health*/

export const {
    useGetDoctorsQuery,
    useGetDoctorQuery,
    useSetAppointmentMutation,
    useGetAppointmentsQuery,
    useGetAppointmentQuery,
    useGetDoctorAppointmentQuery,
    useGetDoctorTodayAppointmentsQuery,
    useGetDoctorAllAppointmentsQuery,
    useSetDoctorAnamnesisMutation,
    useGetHealthQuery,
    useSetHealthMutation
} = DataService
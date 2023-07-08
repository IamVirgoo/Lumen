import { IUserDoctor } from "../../models/IUserDoctor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : IUserDoctor = {
    name : "name",
    surname : "surname",
    patronymic : "patronymic",
    phone_number : "0-000-000-0000",
    authenticate : true,
    access_token : "",
    refresh_token : ""
}

export const IUserDoctorSlice = createSlice({
    name : "doctor",
    initialState,
    reducers : {
        doctor_logIn : (state, action : PayloadAction<IUserDoctor>) => {
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.patronymic = action.payload.patronymic;
            state.phone_number = action.payload.phone_number;
            state.authenticate = action.payload.authenticate;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token
        },
        doctor_logOut : (state, action) => {
            state.name = "";
            state.surname = "";
            state.patronymic = "";
            state.phone_number = "";
            state.authenticate = false;
            state.access_token = "";
            state.refresh_token = "";
        }
    }
})

export const {
    doctor_logIn,
    doctor_logOut
} = IUserDoctorSlice.actions

export default IUserDoctorSlice.reducer
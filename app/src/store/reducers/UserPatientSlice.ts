import { IUserPatient } from "../../models/IUserPatient";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserPatient = {
    name : "name",
    surname : "surname",
    patronymic : "patronymic",
    phone_number : "0-000-000-0000",
    authenticate : false,
    access_token : ""
}

export const IUserPatientSlice = createSlice({
    name : "patient",
    initialState,
    reducers: {
        logIn : (state, action : PayloadAction<IUserPatient>) => {
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.patronymic = action.payload.patronymic;
            state.phone_number = action.payload.phone_number;
            state.authenticate = action.payload.authenticate;
            state.access_token = action.payload.access_token
        },
        logOut : (state, action) => {
            state.name = "";
            state.surname = "";
            state.patronymic = "";
            state.phone_number = "";
            state.authenticate = false;
            state.access_token = ""
        }
    }
})

export const {
    logIn,
    logOut
} = IUserPatientSlice.actions

export default IUserPatientSlice.reducer
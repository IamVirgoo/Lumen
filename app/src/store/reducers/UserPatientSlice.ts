import { IUserPatient } from "../../models/IUserPatient";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserPatient = {
    username : "null-point",
    authenticate : false,
    access_token : ""
}

export const IUserPatientSlice = createSlice({
    name : "patient",
    initialState,
    reducers: {
        logIn : (state, action : PayloadAction<IUserPatient>) => {
            state.username = action.payload.username;
            state.authenticate = action.payload.authenticate;
            state.access_token = action.payload.access_token
        },
        logOut : (state, action) => {
            state.username = "";
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
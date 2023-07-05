import { IUserDoctor } from "../../models/IUserDoctor";
import { createSlice } from "@reduxjs/toolkit";

const initialState : IUserDoctor = {}

export const IUserDoctorSlice = createSlice({
    name : "doctor",
    initialState,
    reducers : {}
})

export const {
} = IUserDoctorSlice.actions

export default IUserDoctorSlice.reducer
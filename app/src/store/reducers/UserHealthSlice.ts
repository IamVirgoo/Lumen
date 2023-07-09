import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserHealth } from "../../models/IUserHealth";

const initialState : IUserHealth = {
    pressure : "давление",
    temperature : 0,
    pulse : 0,
    saturation : 0,
    sugar : 0,
    state : ""
}

export const IUserHealthSlice = createSlice({
    name : "health",
    initialState,
    reducers : {
        updateHealth : (state, action : PayloadAction<IUserHealth>) => {
            state.pressure = action.payload.pressure
            state.temperature = action.payload.temperature
            state.pulse = action.payload.pulse
            state.saturation = action.payload.saturation
            state.sugar = action.payload.sugar
            state.state = action.payload.state
        }
    }
})

export const {
    updateHealth
} = IUserHealthSlice.actions

export default IUserHealthSlice.reducer
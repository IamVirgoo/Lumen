import IUserPatientSliceReducer from "./reducers/UserPatientSlice"
import IUSerDoctorSliceReducer from "./reducers/UserDoctorSlice"

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthService } from "../services/authService";
import { DataService } from "../services/dataService";

const rootReducer = combineReducers({
    [AuthService.reducerPath]: AuthService.reducer,
    userPatient: IUserPatientSliceReducer,
    [DataService.reducerPath]: DataService.reducer,
    userDoctor: IUSerDoctorSliceReducer
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().prepend(AuthService.middleware).prepend(DataService.middleware);
    },
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
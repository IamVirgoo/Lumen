import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthService } from "../services/authService";
import IUserPatientSliceReducer from "./reducers/UserPatientSlice"

const rootReducer = combineReducers({
    [AuthService.reducerPath]: AuthService.reducer,
    userPatient: IUserPatientSliceReducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().prepend(AuthService.middleware);
    },
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
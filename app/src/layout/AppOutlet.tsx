import AppSidebar from "../components/admin/sidebar";

import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { RootState } from "../store/store";

export default function AppOutlet() {
    const AUTH = useAppSelector((state : RootState) => state.userPatient.authenticate)
    return <>
        { AUTH
            ? <AppSidebar/>
            : <></>
        }
        <Outlet/>
    </>
}
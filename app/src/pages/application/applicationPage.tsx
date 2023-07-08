import DoctorPanel from "./doctorPanel";
import PatientPanel from "./patientPanel";

import { useGetUserQuery } from "../../services/authService";

export default function ApplicationPage() {
    const GET_USER =
        useGetUserQuery(localStorage.getItem("access_token") as string)

    if (GET_USER.isSuccess) {
        return <>{ GET_USER.data.role == "doctor"
            ? <DoctorPanel/>
            : <PatientPanel/>
        }</>
    }
    if (GET_USER.isLoading) {
        return <main className={'app-main'}>
            <div className={'app-main--container'}>
                <h2>Загрузка</h2>
            </div>
        </main>
    }
    return <main className={'app-main'}>
        <div className={'app-main--container'}>
            <h2>Ошибка</h2>
        </div>
    </main>
}
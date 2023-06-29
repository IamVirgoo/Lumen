import AppHeader from "../../components/admin/header";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";

export default function ApplicationIndexPage() {
    const USER = useAppSelector((state : RootState) => state.userPatient)
    const AUTH = useAppSelector((state : RootState) => state.userPatient.authenticate)

    useEffect(() => {
    }, [])

    return <>
        { localStorage.getItem("authenticate") == "true"
            ?  <main className={'app-main'}>
                <AppHeader name={USER.name} surname={USER.surname} patronymic={USER.patronymic}/>
            </main>
            : <main className={'app-main'}>
                <AppHeader name={USER.name} surname={USER.surname} patronymic={USER.patronymic}/>
            </main>
        }
    </>
}

function loginUser(arg0: { phone: number; password: any; }) {
    throw new Error("Function not implemented.");
}

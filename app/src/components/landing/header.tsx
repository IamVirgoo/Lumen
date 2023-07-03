import jwtDecode from "jwt-decode";

import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../services/authService";
import { useEffect, useState } from "react";
import { decoded_token } from "../../models/IToken";
import { logIn, logOut } from "../../store/reducers/UserPatientSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/store";

export default function Header() {
    const dispatch = useAppDispatch()

    const [type, setType] = useState<boolean>(false)

    const ACCESS_TOKEN : string | null = localStorage.getItem("access_token");
    const REFRESH_TOKEN : string | null = localStorage.getItem("refresh_token");

    const USER = useAppSelector((state : RootState) => state.userPatient)

    const result = useGetUserQuery(localStorage.getItem("access_token") as string)
    if (result.isError) console.log("request error")

    const currentData = new Date()

    useEffect(() => {
        if (ACCESS_TOKEN != null) {
            console.log("start")

            const DECODED_ACCESS_TOKEN : decoded_token = jwtDecode(ACCESS_TOKEN as string)
            const DECODED_REFRESH_TOKEN : decoded_token = jwtDecode(REFRESH_TOKEN as string)

            console.log(DECODED_ACCESS_TOKEN)
            console.log(DECODED_REFRESH_TOKEN)

            if (DECODED_ACCESS_TOKEN.exp * 1000 < currentData.getTime()) {
                setType(false)
                console.log("token expired")
            } else {
                setType(true)
                console.log("good")
                if (result.isSuccess) {
                    dispatch(logIn({
                        name: result.data.name,
                        surname: result.data.surname,
                        patronymic: result.data.patronymic,
                        phone_number: result.data.phone_number,
                        authenticate: true,
                        access_token: localStorage.getItem("access_token") as string,
                        refresh_token: localStorage.getItem("refresh_token") as string
                    }))
                    console.log(result)
                }
                if (result.isError) console.log("request error")
            }
        } else console.log("bad")
    }, [result])

    return <header className={"header"}>
        <div className={"header--container"}>
            <div className={"header--container--content"}>
                <Link to={'/'} className={"header--container--content--title"}>Lumen</Link>
                { type
                    ? <>
                        <div className="header--container--content--dropdown">
                            <Link to={'/application'} className={'header--container--content--user-wrapper'}>
                                <p className={'header--container--content--user-wrapper__username'}>{USER.name}</p>
                                <div className={'header--container--content--user-wrapper__image'} >
                                    <p>{USER.name.at(0)}</p>
                                </div>
                            </Link>
                            <div className="header--container--content--dropdown__services--wrapper"/>
                            <div className="header--container--content--dropdown__services--content">
                                <p onClick={() => {
                                    dispatch(logOut)
                                    localStorage.clear()
                                }}>Выйти</p>
                            </div>
                        </div>
                    </>
                    : <Link className={"header--container--content--button"} to={"/sign-in"} target={"__blank"}>
                        Войти
                    </Link>
                }
            </div>
            <div className={"header--container--line"}/>
        </div>
    </header>
}
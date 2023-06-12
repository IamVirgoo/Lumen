import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../services/authService";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logIn } from "../store/reducers/UserPatientSlice";
import { RootState } from "../store/store";
import {IUserPatient} from "../models/IUserPatient";

export default function LoginPage() {
    const dispatch = useAppDispatch()
    const navigator = useNavigate()

    const [telephoneNumber, setTelephoneNumber] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [loginUser, {isLoading, isError, error, isSuccess}] = useSignInMutation();

    const handleSubmit = async () => {
        try {
            await loginUser({
                phone: Number(telephoneNumber),
                password: password
            }).then((result : any) => {
                console.log(result)
                dispatch(logIn({
                    name : result.data.user.name,
                    surname : result.data.user.surname,
                    patronymic : result.data.user.patronymic,
                    phone_number : result.data.user.phone_number,
                    authenticate : true,
                    access_token : result.data.access_token
                }))
                navigator("/application")
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main>
            <section className={"sign-in"}>
                <div className={"sign-in--container"}>
                    <h1 className={"sign-in--container--title"}>
                        Войти в систему
                    </h1>
                    <form className={"sign-in--container--form"}>
                        <input
                            className={"sign-in--container--form--input"}
                            type="text"
                            placeholder={"Номер телефона"}
                            value={telephoneNumber}
                            onChange={(e) => setTelephoneNumber(e.target.value)}
                        />
                        <input
                            className={"sign-in--container--form--input"}
                            type="password"
                            placeholder={"Пароль"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className={"sign-in--container--form--button-wrapper"}>
                            <button
                                className={"sign-in--container--form--button-wrapper--button"}
                                type="button"
                                onClick={handleSubmit}
                            >
                                Войти
                            </button>
                            <p className={"sign-in--container--form--button-wrapper--text"}>
                                ещё не зарегистрированы?
                                <Link
                                    to={"/sign-up"}
                                    className={"sign-in--container--form--button-wrapper--text__link"}
                                >
                                    зарегистрироваться
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../services/authService";

export default function RegistrationPage() {
    const navigator = useNavigate()

    const [username, setUsername] = useState<string | null>(null)
    const [telephoneNumber, setTelephoneNumber] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null)

    const [RegistrationUser, {isLoading, isError, isSuccess}] = useSignUpMutation()

    const handleSubmit = async () => {
        try {
            RegistrationUser({
                username : username as string,
                telephoneNumber : telephoneNumber as string,
                password : password as string
            })
            if (isSuccess) navigator('/app')
            /*useSignInQuery({
                username: username as string,
                password: password as string
            })*/
        } catch (error) {
            console.log(error)
        }
    }

    return <main>
        <section className={"sign-up"}>
            <div className={"sign-up--container"}>
                <h1 className={"sign-up--container--title"}>
                    Зарегистрироваться в системе
                </h1>
                <form className={"sign-up--container--form"}>
                    <input className={"sign-up--container--form--input"}
                           type="text"
                           placeholder={"Логин"}
                           onChange={(e) => setUsername(e.target.value)}
                    />
                    <input className={"sign-up--container--form--input"}
                           type="tel"
                           required
                           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                           placeholder={"Номер телефона"}
                           onChange={(e) => setTelephoneNumber(e.target.value)}
                    />
                    <input className={"sign-up--container--form--input"}
                           type="password"
                           placeholder={"Пароль"}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <input className={"sign-up--container--form--input"}
                           type="password"
                           placeholder={"Повторно введите пароль"}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className={"sign-up--container--form--button-wrapper"}>
                        <input className={"sign-up--container--form--button-wrapper--button"}
                               type="button"
                               value={"Зарегистрироваться"}
                               onClick={handleSubmit}
                        />
                        <p className={"sign-up--container--form--button-wrapper--text"}>
                            уже зарегистрированы? <Link
                            to={"/sign-in"}
                            className={"sign-up--container--form--button-wrapper--text__link"}>
                            войдите в систему
                        </Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    </main>
}
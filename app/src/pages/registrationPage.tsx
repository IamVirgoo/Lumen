import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../services/authService";

export default function RegistrationPage() {
    const navigator = useNavigate()

    const [name, setName] = useState<string | null>(null)
    const [surname, setSurname] = useState<string | null>(null)
    const [patronymic, setPatronymic] = useState<string | null>(null)
    const [telephoneNumber, setTelephoneNumber] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null)

    const [RegistrationUser, {isLoading, isError, isSuccess}] = useSignUpMutation()

    const handleSubmit = async () => {
        try {
            RegistrationUser({
                name : name as string,
                surname : surname as string,
                patronymic : patronymic as string,
                telephoneNumber : telephoneNumber as string,
                password : password as string
            })
            navigator("/confirmation")
            if (isSuccess) navigator('/app')
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
                           placeholder={"Имя"}
                           onChange={(e) => setName(e.target.value)}
                    />
                    <input className={"sign-up--container--form--input"}
                           type="text"
                           placeholder={"Фамилия"}
                           onChange={(e) => setSurname(e.target.value)}
                    />
                    <input className={"sign-up--container--form--input"}
                           type="text"
                           placeholder={"Отчество"}
                           onChange={(e) => setPatronymic(e.target.value)}
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
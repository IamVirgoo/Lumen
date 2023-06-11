import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../services/authService";

export default function LoginPage() {
    const navigator = useNavigate()

    const [username, setUsername] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const [LoginUser, {isLoading, isError, error, isSuccess}] = useSignInMutation()

    const handleSubmit = async () => {
        try {
            LoginUser({
                username : username as string,
                password : password as string
            })
            if (isSuccess) navigator('/app')
        } catch (error) {
            console.log(error)
        }
    }

    return <main>
        <section className={"sign-in"}>
            <div className={"sign-in--container"}>
                <h1 className={"sign-in--container--title"}>
                    Войти в систему
                </h1>
                <form className={"sign-in--container--form"}>
                    <input className={"sign-in--container--form--input"}
                           type="text"
                           placeholder={"Логин"}
                           onChange={(e) => setUsername(e.target.value)}
                    />
                    <input className={"sign-in--container--form--input"}
                           type="password"
                           placeholder={"Пароль"}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={"sign-in--container--form--button-wrapper"}>
                        <button className={"sign-in--container--form--button-wrapper--button"}
                               type="button"
                               onClick={handleSubmit}
                        >Войти</button>
                        <p className={"sign-in--container--form--button-wrapper--text"}>
                            ещё не зарегистрированы? <Link
                            to={"/sign-up"}
                            className={"sign-in--container--form--button-wrapper--text__link"}>
                            зарегистрироваться
                        </Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    </main>
}
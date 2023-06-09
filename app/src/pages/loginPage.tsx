import { Link } from "react-router-dom";

export default function LoginPage() {
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
                    />
                    <input className={"sign-in--container--form--input"}
                           type="password"
                           placeholder={"Пароль"}
                    />
                    <div className={"sign-in--container--form--button-wrapper"}>
                        <input className={"sign-in--container--form--button-wrapper--button"}
                               type="button"
                               value={"Войти"}
                        />
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
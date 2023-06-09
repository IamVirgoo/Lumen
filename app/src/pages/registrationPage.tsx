import { Link } from "react-router-dom";

export default function RegistrationPage() {
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
                    />
                    <input className={"sign-up--container--form--input"}
                           type="email"
                           placeholder={"Email"}
                    />
                    <input className={"sign-up--container--form--input"}
                           type="tel"
                           required
                           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                           placeholder={"Номер телефона"}
                    />
                    <input className={"sign-up--container--form--input"}
                           type="password"
                           placeholder={"Пароль"}
                    />
                    <input className={"sign-up--container--form--input"}
                           type="password"
                           placeholder={"Повторно введите пароль"}
                    />
                    <div className={"sign-up--container--form--button-wrapper"}>
                        <input className={"sign-up--container--form--button-wrapper--button"}
                               type="button"
                               value={"Зарегистрироваться"}
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
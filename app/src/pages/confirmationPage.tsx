import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function ConfirmationPage() {
    const navigator = useNavigate()

    const [confirmationCode, setConfirmationCode] = useState<string | null>(null)

    const handleSubmit = () => {
        navigator("/sign-in")
    }

    const handleRepeat = () => {
        /*...*/
    }

    return <main>
        <section className={"confirmation"}>
            <div className={"confirmation--container"}>
                <h1 className={"confirmation--container--title"}>
                    Подтвердите номер телефона
                </h1>
                <form className={"confirmation--container--form"}>
                    <input className={"confirmation--container--form--input"}
                        type="text"
                        placeholder={"Введите код подтверждения"}
                        onChange={(e) => setConfirmationCode(e.target.value)}
                    />
                    <div className={"confirmation--container--form--button-wrapper"}>
                        <button className={"confirmation--container--form--button-wrapper--button"}
                            type={"button"}
                            onClick={handleSubmit}
                        >
                            Подтвердить
                        </button>
                        <p className={"confirmation--container--form--button-wrapper--text"}>или</p>
                        <button className={"confirmation--container--form--button-wrapper--button"}
                            type={"button"}
                            onClick={handleRepeat}
                        >
                            Повторно прислать код
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </main>
}
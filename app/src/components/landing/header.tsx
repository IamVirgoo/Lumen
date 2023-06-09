import { Link } from "react-router-dom";

export default function Header() {
    return <header className={"header"}>
        <div className={"header--container"}>
            <div className={"header--container--content"}>
                <h2 className={"header--container--content--title"}>Lumen</h2>
                <Link className={"header--container--content--button"} to={"/singIn"}>
                    Войти
                </Link>
            </div>
            <div className={"header--container--line"}/>
        </div>
    </header>
}
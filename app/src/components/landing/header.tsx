import { Link } from "react-router-dom";

export default function Header() {
    return <header className={"header"}>
        <div className={"header--container"}>
            <div className={"header--container--content"}>
                <Link to={'/'} className={"header--container--content--title"}>Lumen</Link>
                <Link className={"header--container--content--button"} to={"/sign-in"} target={"__blank"}>
                    Войти
                </Link>
            </div>
            <div className={"header--container--line"}/>
        </div>
    </header>
}
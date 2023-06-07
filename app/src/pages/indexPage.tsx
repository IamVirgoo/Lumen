import { Link } from "react-router-dom";

export default function IndexPage() {
    return <main>
        <div>
            <div>
                <h1>Hello 👋</h1>
                <Link to={"/app/"}>go to app</Link>
            </div>
        </div>
    </main>
}
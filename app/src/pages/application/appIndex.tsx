import { Link } from "react-router-dom";

export default function AppIndex() {
    return <main>
        <div>
            <div>
                <h1>I'm nested 👍</h1>
                <div>
                    <Link to={"/app/second"}>second nested page</Link>
                    <Link to={"/"}>home page</Link>
                </div>
            </div>
        </div>
    </main>
}
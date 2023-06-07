import { Link } from "react-router-dom";

export default function SecondPage() {
    return <main>
        <div>
            <div>
                <h1>I am nested too 🫠</h1>
                <div>
                    <Link to={"/app"}>index app page</Link>
                    <Link to={"/"}>home page</Link>
                </div>
            </div>
        </div>
    </main>
}